import { useLocalSearchParams } from 'expo-router';

import { ExamList } from '@/components/exam-list';
import { HOME } from '@/content';
import type { SectionSlug } from '@/theme';

/** One section's exam listing: Listening, Reading, Writing or Speaking. */
export default function SectionExamsScreen() {
  const { section } = useLocalSearchParams<{ section: SectionSlug }>();
  const meta = HOME.sections.find((candidate) => candidate.slug === section);

  if (!meta) return null;

  return (
    <ExamList
      section={meta.slug}
      title={meta.title}
      suffix="Section Exams"
      variants={meta.variants}
    />
  );
}
