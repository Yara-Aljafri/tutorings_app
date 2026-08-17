import { ExamList } from '@/components/exam-list';

/** The combined IELTS practice exams, behind the "Take Full Test" card. */
export default function IeltsExamsScreen() {
  return <ExamList section="ielts" title="IELTS" suffix="Practice Exams" bold variants />;
}
