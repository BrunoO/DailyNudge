import { StyleSheet, Text, View } from 'react-native';

import type { AchievementLevel } from '../types/habits';
import { AchievementSelector } from './AchievementSelector';
import { CommentField } from './CommentField';

type HabitCardProps = {
  icon: string;
  title: string;
  level: AchievementLevel | null;
  comment: string;
  onLevelChange: (level: AchievementLevel) => void;
  onCommentChange: (comment: string) => void;
};

export function HabitCard({
  icon,
  title,
  level,
  comment,
  onLevelChange,
  onCommentChange,
}: HabitCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          {icon} {title}
        </Text>
        <AchievementSelector value={level} onChange={onLevelChange} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#263238',
  },
});
