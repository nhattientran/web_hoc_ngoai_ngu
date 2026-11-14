import React, { useEffect, useRef, useState } from 'react';
import { Eraser, Eye, EyeOff, Volume2 } from 'lucide-react';
import { speakText } from '../../utils/speech';

interface Props {
  character: string;
  reading: string;
  strokeHint?: string;
}

export const KanaDrawingCanvas: React.FC<Props> = ({ character, reading, strokeHint }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasStrokes, setHasStrokes] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStrokes(false);
  };

  useEffect(() => {
    clearCanvas();
  }, [character]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#08090D';
    setDrawing(true);
    setHasStrokes(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    setDrawing(false);
  };

  return (
    <div className="rounded-[22px] border border-black/10 bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-black/45">Bảng tập viết</span>
          <div className="flex items-center gap-2">
            <span className="font-jp text-2xl font-bold text-[#08090D]">{character}</span>
            <span className="rounded-full bg-[#E5D9F7] px-2.5 py-0.5 text-xs font-bold text-[#4B2C7A]">
              {reading}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => speakText(character, 'ja-JP', 0.85)}
            className="rounded-full border border-black/10 p-2 text-[#08090D] hover:bg-black/5"
            title="Nghe phát âm"
          >
            <Volume2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowGuide((v) => !v)}
            className="rounded-full border border-black/10 p-2 text-[#08090D] hover:bg-black/5"
            title={showGuide ? 'Ẩn chữ mẫu mờ' : 'Hiện chữ mẫu mờ'}
          >
            {showGuide ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="rounded-full border border-black/10 p-2 text-[#08090D] hover:bg-black/5"
            title="Xóa viết lại"
          >
            <Eraser className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mx-auto aspect-square max-w-[240px] overflow-hidden rounded-2xl border border-black/10 bg-[#F6F6F4]">
        {/* Grid crosshairs */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px border-l border-dashed border-black/15" />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px border-t border-dashed border-black/15" />
        </div>
        {showGuide && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-jp select-none text-[130px] font-medium leading-none text-black/10">
              {character}
            </span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={260}
          height={260}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative z-10 h-full w-full touch-none cursor-crosshair"
        />
      </div>

      <p className="mt-2.5 text-center text-xs text-black/60">
        {strokeHint || 'Dùng chuột hoặc ngón tay tô theo nét chữ mờ phía trên.'}
        {hasStrokes && <span className="ml-1 font-semibold text-[#1B5C32]">✓ Đã luyện nét</span>}
      </p>
    </div>
  );
};
