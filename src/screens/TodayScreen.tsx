import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HabitCard } from '../components/HabitCard';
import { MealHabitCard } from '../components/MealHabitCard';
import type {
  AchievementLevel,
  HabitEntry,
  MealHabitEntry,
  MealKey,
} from '../types/habits';

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function shiftDate(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

const INITIAL_WATER: HabitEntry = {
  level: 'orange',
  comment: 'Only 4 glasses — hot day.',
};

const INITIAL_MEALS: MealHabitEntry = {
  meals: {
    breakfast: 'green',
    lunch: 'orange',
    dinner: null,
    snacks: 'red',
  },
  comment: '',
};

export function TodayScreen() {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [water, setWater] = useState<HabitEntry>(INITIAL_WATER);
  const [eatHealthy, setEatHealthy] = useState<MealHabitEntry>(INITIAL_MEALS);

  const isToday = isSameDay(selectedDate, today);
  const mealGreenCount = Object.values(eatHealthy.meals).filter(
    level => level === 'green',
  ).length;
  const completedHabits =
    (water.level === 'green' ? 1 : 0) + (mealGreenCount === 4 ? 1 : 0);

  const handleWaterLevel = (level: AchievementLevel) => {
    setWater(current => ({ ...current, level }));
  };

  const handleMealLevel = (meal: MealKey, level: AchievementLevel) => {
    setEatHealthy(current => ({
      ...current,
      meals: { ...current.meals, [meal]: level },
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.appName}>DailyNudge</Text>
          <View style={styles.dateRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Previous day"
              onPress={() => setSelectedDate(current => shiftDate(current, -1))}
              style={styles.dateNavButton}>
              <Text style={styles.dateNavLabel}>‹</Text>
            </Pressable>
            <View style={styles.dateCenter}>
              <Text style={styles.dateLabel}>
                {isToday ? 'Today' : 'Selected day'}
              </Text>
              <Text style={styles.dateValue}>{formatDisplayDate(selectedDate)}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Next day"
              disabled={isToday}
              onPress={() => setSelectedDate(current => shiftDate(current, 1))}
              style={[styles.dateNavButton, isToday && styles.dateNavButtonDisabled]}>
              <Text
                style={[
                  styles.dateNavLabel,
                  isToday && styles.dateNavLabelDisabled,
                ]}>
                ›
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Day snapshot</Text>
          <Text style={styles.summaryText}>
            {completedHabits}/2 habits fully achieved
          </Text>
          <View style={styles.legendRow}>
            <LegendSwatch color="#E53935" label="Not achieved" />
            <LegendSwatch color="#FB8C00" label="Partial" />
            <LegendSwatch color="#43A047" label="Full" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Habits</Text>

        <HabitCard
          comment={water.comment}
          icon="💧"
          level={water.level}
          title="Water"
          onCommentChange={comment => setWater(current => ({ ...current, comment }))}
          onLevelChange={handleWaterLevel}
        />

        <MealHabitCard
          comment={eatHealthy.comment}
          meals={eatHealthy.meals}
          onCommentChange={comment =>
            setEatHealthy(current => ({ ...current, comment }))
          }
          onMealChange={handleMealLevel}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

type LegendSwatchProps = {
  color: string;
  label: string;
};

function LegendSwatch({ color, label }: LegendSwatchProps) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 16,
    gap: 16,
  },
  appName: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#607D8B',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dateNavButtonDisabled: {
    opacity: 0.35,
  },
  dateNavLabel: {
    fontSize: 28,
    lineHeight: 30,
    color: '#37474F',
  },
  dateNavLabelDisabled: {
    color: '#90A4AE',
  },
  dateCenter: {
    alignItems: 'center',
    gap: 2,
  },
  dateLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#78909C',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dateValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#263238',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    gap: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#546E7A',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#263238',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 12,
    color: '#78909C',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#607D8B',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
});
