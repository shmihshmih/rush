export interface IPrepositionExercise {
  id: string;
  preposition: 'at' | 'on' | 'in'; // at on in
  word: string; // monday
  russian: string; // перевод
  type: 'simple' | 'phrase'; // обычный пример или устойчивое выражение
  example?: string[];
}
