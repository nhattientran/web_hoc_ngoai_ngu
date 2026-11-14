import React, { useState } from 'react';

export type TooltipPlacement = 'right' | 'left' | 'top' | 'bottom';

interface HoverTooltipProps {
  label: string;
  description?: string;
  placement?: TooltipPlacement;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const PLACEMENT_CLASSES: Record<TooltipPlacement, string> = {
  right: 'left-full top-1/2 ml-3 -translate-y-1/2',
  left: 'right-full top-1/2 mr-3 -translate-y-1/2',
  top: 'bottom-full left-1/2 mb-2.5 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2.5 -translate-x-1/2',
};

const ARROW_CLASSES: Record<TooltipPlacement, string> = {
  right: '-left-1 top-1/2 -translate-y-1/2 border-l border-b',
  left: '-right-1 top-1/2 -translate-y-1/2 border-r border-t',
  top: '-bottom-1 left-1/2 -translate-x-1/2 border-r border-b',
  bottom: '-top-1 left-1/2 -translate-x-1/2 border-l border-t',
};

export const HoverTooltip: React.FC<HoverTooltipProps> = ({
  label,
  description,
  placement = 'right',
  disabled = false,
  className = '',
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const [dismissedOnClick, setDismissedOnClick] = useState(false);

  const isVisible = !disabled && !dismissedOnClick && (isHovered || isFocusVisible);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setDismissedOnClick(false);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setDismissedOnClick(false);
      }}
      onClickCapture={() => {
        setDismissedOnClick(true);
        setIsFocusVisible(false);
      }}
      onFocusCapture={(e) => {
        if (e.target instanceof HTMLElement && e.target.matches(':focus-visible')) {
          setIsFocusVisible(true);
        }
      }}
      onBlurCapture={() => {
        setIsFocusVisible(false);
      }}
    >
      {children}
      {!disabled && (
        <div
          role="tooltip"
          className={`pointer-events-none absolute z-[60] w-max max-w-[230px] rounded-xl border border-white/15 bg-[#08090D] px-3 py-2 text-left text-white shadow-xl transition-all duration-150 ${
            PLACEMENT_CLASSES[placement]
          } ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <div
            className={`absolute h-2 w-2 rotate-45 border-white/15 bg-[#08090D] ${ARROW_CLASSES[placement]}`}
          />
          <div className="relative text-xs font-extrabold leading-tight">{label}</div>
          {description && (
            <div className="relative mt-0.5 text-[11px] font-medium leading-snug text-white/75">
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
