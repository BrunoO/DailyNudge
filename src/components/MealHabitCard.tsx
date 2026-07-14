import { StyleSheet, Text, View } from 'react-native';

import type { AchievementLevel, MealAchievements, MealKey } from '../types/habits';
import { MEAL_LABELS } from '../types/habits';
import { AchievementSelector } from './AchievementSelector';
import { CommentField } from './CommentField';

const MEAL_KEYS: MealKey[] = ['breakfast', 'lunch', 'dinner', 'snacks'];

type MealHabitCardProps = {
  meals: MealAchievements;
  comment: string;
  onMealChange: (meal: MealKey, level: AchievementLevel) => void;
  onCommentChange: (comment: string) => void;
};

export function MealHabitCard({
  meals,
  comment,
  onMealChange,
  onCommentChange,
}: MealHabitCardProps) {
  const greenCount = MEAL_KEYS.filter(meal => meals[meal] === 'green').length;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>🥗 Eat healthy</Text>
          <Text style={styles.subtitle}>{greenCount}/4 meals on track</Text>
        </View>
      </View>

      <View style={styles.mealList}>
        {MEAL_KEYS.map(meal => (
          <View key={meal} style={styles.mealRow}>
            <Text style={styles.mealLabel}>{MEAL_LABELS[meal]}</Text>
            <AchievementSelector
              compact
              value={meals[meal]}
              onChange={level => onMealChange(meal, level)}
            />
          </View>
        ))}
      </View>

      <CommentField comment={comment} onChange={onCommentChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    marginBottom: 12,
  },
  titleBlock: {
    gap: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#263238',
  },
  subtitle: {
    fontSize: 13,
    color: '#78909C',
  },
  mealList: {
    gap: 10,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  mealLabel: {
    flex: 1,
    fontSize: 15,
    color: '#455A64',
  },
});
