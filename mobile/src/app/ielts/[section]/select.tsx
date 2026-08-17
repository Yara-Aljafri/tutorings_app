import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useContent } from '@/api';
import { SectionIcon } from '@/components/ui';
import { HOME, Section } from '@/content';
import { colors, rtlText, sectionColor, shadows, SectionSlug } from '@/theme';

type Choice = { value: string; label: string; questions: string | null };

/** Which tasks to sit, and for how long — the picker in front of a section. */
export default function SectionSelectScreen() {
  const { section } = useLocalSearchParams<{ section: SectionSlug }>();
  const fallback = HOME.sections.find((candidate) => candidate.slug === section);
  const { data } = useContent<{ section: Section }>(`/api/sections/${section}`, {
    section: fallback as Section,
  });

  const meta = data.section ?? fallback;
  const choices: Choice[] = useMemo(() => {
    if (!meta) return [];
    return [
      { value: 'full', label: meta.full_task_label, questions: meta.full_task_questions },
      ...meta.tasks.map((task, index) => ({
        value: `task-${index + 1}`,
        label: task.label,
        questions: task.questions,
      })),
    ];
  }, [meta]);

  const [choice, setChoice] = useState('full');
  const [duration, setDuration] = useState<string | null>(null);

  if (!meta) return null;

  const accent = sectionColor[meta.slug];
  const selectedDuration = duration ?? meta.durations[0];

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={[styles.card, shadows.soft]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <SectionIcon section={meta.slug} size={36} color={accent} />
            <Text style={[styles.sectionTitle, { color: accent }]}>{meta.title}</Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.headerHeading}>اختر الأقسام</Text>
            <View style={styles.headerInfo}>
              <View style={styles.flexShrink}>
                <Text style={[styles.infoText, rtlText]}>:معلومات عن قسم {meta.subject}</Text>
                <Text style={[styles.infoText, rtlText]}>{meta.info}</Text>
              </View>
              <Ionicons name="bulb-outline" size={26} color={colors.muted} />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {choices.map((option) => {
          const selected = option.value === choice;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => setChoice(option.value)}
              style={styles.choiceRow}
            >
              <View
                style={[
                  styles.radio,
                  { borderColor: accent },
                  selected ? { backgroundColor: accent, borderColor: '#fff' } : null,
                ]}
              />
              <Text style={styles.choiceLabel}>
                {option.label}
                {option.questions ? (
                  <Text style={styles.choiceQuestions}> {option.questions}</Text>
                ) : null}
              </Text>
            </Pressable>
          );
        })}

        <Text style={[styles.durationLabel, rtlText]}>اختر الوقت لهذا القسم</Text>
        <View style={styles.durationRow}>
          {meta.durations.map((option) => {
            const selected = option === selectedDuration;
            return (
              <Pressable
                key={option}
                onPress={() => setDuration(option)}
                style={[
                  styles.durationPill,
                  selected ? { backgroundColor: accent, borderColor: accent } : null,
                ]}
              >
                <Text style={selected ? styles.durationTextSelected : styles.durationText}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push({ pathname: '/ielts/[section]', params: { section: meta.slug } })}
          style={[styles.startButton, { backgroundColor: accent }]}
        >
          <Ionicons name="arrow-back" size={16} color="#fff" />
          <Text style={styles.startText}>بدء الآن</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20, backgroundColor: '#f3f4f6', flexGrow: 1 },
  card: { backgroundColor: colors.card, borderRadius: 8, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  headerLeft: { alignItems: 'center', gap: 4 },
  headerRight: { flex: 1, alignItems: 'flex-end' },
  flexShrink: { flexShrink: 1 },
  sectionTitle: { fontSize: 20, fontWeight: '700' },
  headerHeading: { fontSize: 20, fontWeight: '700', color: colors.ink },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  infoText: { color: colors.muted, fontSize: 13 },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: 24 },
  choiceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  radio: { width: 20, height: 20, borderRadius: 4, borderWidth: 2 },
  choiceLabel: { flex: 1, color: colors.ink },
  choiceQuestions: { fontSize: 13, color: colors.subtle },
  durationLabel: { marginTop: 12, marginBottom: 8, color: colors.ink },
  durationRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  durationPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#9ca3af',
    backgroundColor: '#d1d5db',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  durationText: { color: '#4b5563' },
  durationTextSelected: { color: '#fff', fontWeight: '600' },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  startText: { color: '#fff', fontWeight: '600' },
});
