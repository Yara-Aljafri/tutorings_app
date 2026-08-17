/**
 * The pieces of the IELTS design that appear on more than one screen —
 * the React Native counterpart of `IeltsWeb.UIComponents`.
 */

import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import type { Exam } from '../content';
import { colors, rtlText, sectionColor, sectionIcon, shadows, SectionSlug } from '../theme';

export function SectionIcon({
  section,
  size = 32,
  color = '#fff',
}: {
  section: SectionSlug;
  size?: number;
  color?: string;
}) {
  return <Ionicons name={sectionIcon[section]} size={size} color={color} />;
}

/** One exam in a listing: a score tab above a card with a coloured notch. */
export function ExamCard({ exam, section }: { exam: Exam; section: SectionSlug | 'ielts' }) {
  const accent = sectionColor[section];

  return (
    <View style={styles.examCardWrapper}>
      <View style={styles.examCardBadges}>
        <View style={[styles.scoreTab, { backgroundColor: exam.taken ? accent : '#9ca3af' }]}>
          <Text style={styles.scoreTabText}>{exam.score}</Text>
        </View>
      </View>

      <View style={styles.examCardRow}>
        <View style={[styles.notch, { backgroundColor: accent }]} />
        <Link
          href={{ pathname: '/ielts/[section]/select', params: { section: exam.section } }}
          asChild
        >
          <Pressable style={StyleSheet.flatten([styles.examCard, shadows.card])}>
            <View style={styles.examCardBody}>
              <View style={styles.flex}>
                <Text style={styles.examTitle}>{exam.title}</Text>
                {exam.subtitle ? <Text style={styles.examSubtitle}>{exam.subtitle}</Text> : null}
              </View>
              <Ionicons
                name="arrow-back"
                size={20}
                color={accent}
                style={{ opacity: exam.taken ? 1 : 0.6 }}
              />
            </View>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

/** The step indicator on the practice screens, e.g. 3 of 5 filled dots. */
export function StepDots({
  step,
  steps,
  section,
}: {
  step: number;
  steps: number;
  section: SectionSlug;
}) {
  return (
    <View>
      <Text style={styles.stepLabel}>
        {step}/{steps}
      </Text>
      <View style={styles.dotRow}>
        {Array.from({ length: steps }, (_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index < step ? sectionColor[section] : colors.track },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

/** The remaining-time chip that hangs off the bottom of a practice card. */
export function TimerChip({
  remaining,
  section,
  style,
}: {
  remaining: string;
  section: SectionSlug;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.timerChip, { backgroundColor: sectionColor[section] }, style]}>
      <Ionicons name="time-outline" size={14} color="#fff" />
      <Text style={styles.timerText}>{remaining}</Text>
    </View>
  );
}

export function EmptyPanel({ message = 'General tests coming soon…' }: { message?: string }) {
  return (
    <View style={[styles.emptyPanel, shadows.card]}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

/** A right-aligned Arabic paragraph. */
export function Rtl({ children, style }: { children: ReactNode; style?: object }) {
  return <Text style={[rtlText, style]}>{children}</Text>;
}

/** A bulleted Arabic list item. */
export function Bullet({ children }: { children: ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletText}>{children}</Text>
      <Text style={styles.bulletDot}>•</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  examCardWrapper: { marginTop: 24 },
  examCardBadges: { alignItems: 'flex-end', paddingRight: 16, marginBottom: -6, zIndex: 1 },
  scoreTab: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 2 },
  scoreTabText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  examCardRow: { flexDirection: 'row', alignItems: 'flex-start' },
  notch: { width: 24, height: 20, borderRadius: 6, marginTop: 18, marginRight: -12 },
  examCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  examCardBody: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  examTitle: { fontSize: 18, fontWeight: '600', color: colors.ink },
  examSubtitle: { fontSize: 12, color: colors.subtle, marginTop: 2 },
  stepLabel: { color: '#c0c0c0', fontSize: 13 },
  dotRow: { flexDirection: 'row', gap: 4, marginTop: 4 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  timerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  timerText: { color: '#fff', fontSize: 12 },
  emptyPanel: { backgroundColor: colors.card, borderRadius: 16, padding: 24, marginTop: 24 },
  emptyText: { textAlign: 'center', color: '#6b7280' },
  bulletRow: { flexDirection: 'row-reverse', alignItems: 'flex-start', gap: 6 },
  bulletText: { flex: 1, ...rtlText, lineHeight: 24 },
  bulletDot: { color: colors.ink, lineHeight: 24 },
});
