import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type CommentFieldProps = {
  comment: string;
  onChange: (comment: string) => void;
};

export function CommentField({ comment, onChange }: CommentFieldProps) {
  const [expanded, setExpanded] = useState(false);
  const hasComment = comment.trim().length > 0;

  if (!expanded) {
    return (
      <View style={styles.collapsedRow}>
        {hasComment ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => setExpanded(true)}
            style={styles.preview}>
            <Text numberOfLines={2} style={styles.previewText}>
              {comment}
            </Text>
          </Pressable>
        ) : null}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hasComment ? 'Edit note' : 'Add note'}
          onPress={() => setExpanded(true)}
          style={styles.commentButton}>
          <Text style={[styles.commentIcon, hasComment && styles.commentIconActive]}>
            {hasComment ? '💬•' : '💬'}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.expanded}>
      <TextInput
        accessibilityLabel="Habit note"
        autoFocus
        multiline
        onBlur={() => setExpanded(false)}
        onChangeText={onChange}
        placeholder="Optional note for today"
        placeholderTextColor="#90A4AE"
        style={styles.input}
        value={comment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  collapsedRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 10,
  },
  preview: {
    flex: 1,
  },
  previewText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#546E7A',
    fontStyle: 'italic',
  },
  commentButton: {
    padding: 4,
  },
  commentIcon: {
    fontSize: 18,
    opacity: 0.45,
  },
  commentIconActive: {
    opacity: 1,
  },
  expanded: {
    marginTop: 10,
  },
  input: {
    minHeight: 72,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 21,
    color: '#263238',
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
  },
});
