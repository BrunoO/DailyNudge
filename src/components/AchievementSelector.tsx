import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { AchievementLevel } from '../types/habits';

type AchievementSelectorProps = {
  value: AchievementLevel | null;
  onChange: (level: AchievementLevel) => void;
  compact?: boolean;
};

const LEVELS: { key: AchievementLevel; label: string; color: string }[] = [
  { key: 'red', label: 'R', color: '#E53935' },
  { key: 'orange', label: 'O', color: '#FB8C00' },
  { key: 'green', label: 'G', color: '#43A047' },
];

export function AchievementSelector({
  value,
  onChange,
  compact = false,
}: AchievementSelectorProps) {
  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      {LEVELS.map(level => {
        const isSelected = value === level.key;

        return (
          <Pressable
            key={level.key}
            accessibilityRole="button"
            accessibilityLabel={`${level.key} achievement`}
            accessibilityState={{ selected: isSelected }}
            onPress={() => onChange(level.key)}
            style={[
              styles.segment,
              compact && styles.segmentCompact,
              isSelected && { backgroundColor: level.color, borderColor: level.color },
            ]}>
            <Text
              style={[
                styles.segmentLabel,
                compact && styles.segmentLabelCompact,
                isSelected && styles.segmentLabelSelected,
              ]}>
              {level.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#ECEFF1',
    padding: 3,
    gap: 3,
  },
  containerCompact: {
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },
  segment: {
    minWidth: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentCompact: {
    minWidth: 28,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#546E7A',
  },
  segmentLabelCompact: {
    fontSize: 12,
  },
  segmentLabelSelected: {
    color: '#FFFFFF',
  },
});
