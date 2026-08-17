/**
 * The exam listing screen, shared by the combined IELTS listing and the four
 * per-section listings. The Academic/General switch is local state, the way
 * the LiveView keeps it in an assign.
 */

import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useContent } from '@/api';
import { EmptyPanel, ExamCard } from '@/components/ui';
import { bundledExams, Exam } from '@/content';
import { colors, sectionColor, shadows, variantColor, SectionSlug } from '@/theme';

type Variant = 'academic' | 'general';

export function ExamList({
  section,
  title,
  suffix,
  bold = false,
  variants = false,
}: {
  section: SectionSlug | 'ielts';
  title: string;
  suffix: string;
  bold?: boolean;
  variants?: boolean;
}) {
  const [variant, setVariant] = useState<Variant>('academic');
  const { data } = useContent<{ exams: Exam[] }>(
    `/api/sections/${section}/exams?variant=${variant}`,
    { exams: variant === 'general' ? [] : bundledExams(section) }
  );

  const accent = sectionColor[section];

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          <Text style={[{ color: accent }, bold ? styles.headingBold : styles.headingMedium]}>
            {title}
          </Text>
          <Text style={bold ? styles.headingBold : undefined}> {suffix}</Text>
        </Text>

        {variants ? (
          <View style={styles.toggleRow}>
            {(['academic', 'general'] as Variant[]).map((option) => {
              const selected = option === variant;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setVariant(option)}
                  style={[
                    styles.toggle,
                    selected ? shadows.card : null,
                    {
                      backgroundColor: selected ? accent : variantColor[section] ?? accent,
                      borderColor: selected ? accent : 'transparent',
                    },
                  ]}
                >
                  <Text style={styles.toggleText}>
                    {option === 'academic' ? 'Academic' : 'General'}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {data.exams.length > 0 ? (
          data.exams.map((exam) => <ExamCard key={exam.id} exam={exam} section={section} />)
        ) : (
          <EmptyPanel />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.paper },
  header: { paddingHorizontal: 16, paddingVertical: 16 },
  heading: { fontSize: 22, color: '#1f2937' },
  headingBold: { fontWeight: '800' },
  headingMedium: { fontWeight: '500' },
  toggleRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  toggle: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 12,
    alignItems: 'center',
  },
  toggleText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  list: { paddingHorizontal: 16, paddingBottom: 40 },
});
