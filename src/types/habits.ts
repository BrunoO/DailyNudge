export type AchievementLevel = 'red' | 'orange' | 'green';

export type MealKey = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export const MEAL_LABELS: Record<MealKey, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
};

export type MealAchievements = Record<MealKey, AchievementLevel | null>;

export type HabitEntry = {
  level: AchievementLevel | null;
  comment: string;
};

export type MealHabitEntry = {
  meals: MealAchievements;
  comment: string;
};
