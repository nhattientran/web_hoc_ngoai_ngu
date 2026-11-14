import { SRSState, VocabItem } from '../types';

export type SRSRating = 'again' | 'hard' | 'good' | 'easy';

const DAY_MS = 24 * 60 * 60 * 1000;

export function gradeVocabItem(item: VocabItem, rating: SRSRating): VocabItem {
  const now = Date.now();
  let ease = item.easeFactor || 2.5;
  let reps = item.repetitions || 0;
  let interval = item.intervalDays || 0;
  let nextState: SRSState = item.srsState;
  let isDifficult = item.isDifficult;

  if (rating === 'again') {
    reps = 0;
    interval = 0;
    ease = Math.max(1.3, ease - 0.2);
    nextState = 'learning';
    isDifficult = true;
    // Review again in 10 minutes
    return {
      ...item,
      easeFactor: Number(ease.toFixed(2)),
      repetitions: reps,
      intervalDays: interval,
      srsState: nextState,
      isDifficult,
      lastReviewedAt: now,
      nextReviewAt: now + 10 * 60 * 1000,
    };
  }

  if (rating === 'hard') {
    reps += 1;
    interval = Math.max(1, Math.round((interval || 1) * 1.2));
    ease = Math.max(1.3, ease - 0.12);
    nextState = reps >= 2 ? 'reviewing' : 'learning';
  } else if (rating === 'good') {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 3;
    else interval = Math.round(interval * ease);
    nextState = reps >= 4 || interval >= 14 ? 'mastered' : 'reviewing';
    if (reps >= 2) isDifficult = false;
  } else if (rating === 'easy') {
    reps += 1;
    if (reps === 1) interval = 4;
    else interval = Math.round(Math.max(2, interval) * ease * 1.3);
    ease = Math.min(3.0, ease + 0.15);
    nextState = reps >= 3 || interval >= 14 ? 'mastered' : 'reviewing';
    isDifficult = false;
  }

  return {
    ...item,
    easeFactor: Number(ease.toFixed(2)),
    repetitions: reps,
    intervalDays: interval,
    srsState: nextState,
    isDifficult,
    lastReviewedAt: now,
    nextReviewAt: now + interval * DAY_MS,
  };
}

export function isDueForReview(item: VocabItem, now = Date.now()): boolean {
  if (item.srsState === 'new') return true;
  return item.nextReviewAt <= now;
}

export function getSRSStateLabelVi(state: SRSState): string {
  switch (state) {
    case 'new':
      return 'Từ mới';
    case 'learning':
      return 'Đang học';
    case 'reviewing':
      return 'Đang ôn';
    case 'mastered':
      return 'Thành thạo';
  }
}
