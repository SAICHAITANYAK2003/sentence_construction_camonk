import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeToMinSec(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function calculateScore(totalQuestions: number, correctAnswers: number): number {
  return Math.round((correctAnswers / totalQuestions) * 100);
}

export function formatBlankSentence(sentence: string): string[] {
  return sentence.split('_____________');
}
