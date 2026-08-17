/**
 * The shape of the content served by the Phoenix API, plus a bundled copy of
 * it.
 *
 * The app renders the bundled copy immediately and swaps in whatever the API
 * returns, so a phone with no route to the server still shows every screen.
 */

import type { SectionSlug } from './theme';

export type Task = { label: string; questions: string | null };

export type Section = {
  slug: SectionSlug;
  title: string;
  subject: string;
  color: string;
  info: string;
  score: string;
  full_task_label: string;
  full_task_questions: string | null;
  tasks: Task[];
  durations: string[];
  variants: boolean;
};

export type Exam = {
  id: string;
  /** The section whose picker this exam opens. */
  section: SectionSlug;
  title: string;
  subtitle: string | null;
  score: string;
  taken: boolean;
};

export type Partner = {
  slug: 'speaking' | 'writing';
  heading: string;
  partner: string;
  color: string;
  cta: string;
  step: number;
  steps: number;
  remaining: string;
  lines: string[];
};

export type HomePayload = {
  mock_test: { name: string; hint: string };
  full_test: { title: string; score: string; progress: number };
  sections: Section[];
};

export type PracticePayload = {
  greeting: { title: string; subtitle: string };
  partners: Partner[];
};

export type SpeakingBriefing = {
  title: string;
  subtitle: string;
  step: number;
  steps: number;
  remaining: string;
  bullets: string[];
};

export type WritingBriefing = {
  title: string;
  step: number;
  steps: number;
  remaining: string;
  closing: string;
  groups: { title: string; bullets: string[] }[];
};

export const HOME: HomePayload = {
  mock_test: {
    name: 'Mock Test 1',
    hint: 'يمكنك حل الامتحان بالكامل أو اختيار أقسام محددة من الأزرار أدناه!',
  },
  full_test: { title: 'Take Full Test', score: '0.0/9', progress: 50 },
  sections: [
    {
      slug: 'listening',
      title: 'Listening',
      subject: 'الإستماع',
      color: '#647fe8',
      info: '40 Questions - 4 Tasks - 32 Minutes',
      score: '5.0/9',
      full_task_label: 'Full Listening Section (Task 1 + Task 2 + Task 3 + Task 4)',
      full_task_questions: '60 Questions',
      tasks: [
        { label: 'TASK 1', questions: '15 Questions' },
        { label: 'TASK 2', questions: '15 Questions' },
        { label: 'TASK 3', questions: '15 Questions' },
        { label: 'TASK 4', questions: '15 Questions' },
      ],
      durations: ['32 Minutes', 'X Minutes'],
      variants: false,
    },
    {
      slug: 'reading',
      title: 'Reading',
      subject: 'القراءة',
      color: '#79c698',
      info: '40 Questions - 3 Tasks - 60 Minutes',
      score: '0.0/9',
      full_task_label: 'Full Reading Section (Task 1 + Task 2 + Task 3)',
      full_task_questions: '40 Questions',
      tasks: [
        { label: 'TASK 1', questions: '15 Questions' },
        { label: 'TASK 2', questions: '15 Questions' },
        { label: 'TASK 3', questions: '15 Questions' },
      ],
      durations: ['60 Minutes', '45 Minutes', '30 Minutes', '15 Minutes'],
      variants: true,
    },
    {
      slug: 'writing',
      title: 'Writing',
      subject: 'الكتابة',
      color: '#35a5dd',
      info: 'Questions 40 - 4 Tasks - 32 Minutes',
      score: '6.5/9',
      full_task_label: 'Full Writing Section (Task 1 + Task 2)',
      full_task_questions: null,
      tasks: [
        { label: 'TASK 1', questions: null },
        { label: 'TASK 2', questions: null },
      ],
      durations: ['60 Minutes', '45 Minutes'],
      variants: true,
    },
    {
      slug: 'speaking',
      title: 'Speaking',
      subject: 'الكتابة',
      color: '#8e81f2',
      info: 'Questions 40 - 4 Tasks - 32 Minutes',
      score: '0.0/9',
      full_task_label: 'Full Speaking Section (Task 1 + Task 2 + Task 3)',
      full_task_questions: '20 Questions',
      tasks: [
        { label: 'TASK 1', questions: '13 Questions' },
        { label: 'TASK 2', questions: '1 Questions' },
        { label: 'TASK 3', questions: '6 Questions' },
      ],
      durations: ['32 Minutes', 'X Minutes'],
      variants: false,
    },
  ],
};

const SCORES = ['7.5/9', '7.5/9', '7.5/9', '0.0/9', '0.0/9', '0.0/9'];

export function bundledExams(section: string): Exam[] {
  return SCORES.map((score, index) => ({
    id: `${section}-${index + 1}`,
    // The combined listing is made up of reading mock tests.
    section: (section === 'ielts' ? 'reading' : section) as SectionSlug,
    title: section === 'writing' ? 'Writing Mock Test' : 'Reading Mock Test 1',
    subtitle: section === 'writing' ? 'Task 1: Pie Chart / Task 2: Problem & Solution' : null,
    score,
    taken: score !== '0.0/9',
  }));
}

export const PRACTICE: PracticePayload = {
  greeting: {
    title: 'مرحبـــــًا رياض',
    subtitle: 'هنا مساحتك لتطوير مهاراتك باستخدام أدوات الذكاء الاصطناعي',
  },
  partners: [
    {
      slug: 'speaking',
      heading: 'Riyad for Speaking!',
      partner: 'Riyad',
      color: '#8e81f2',
      cta: 'إبدأ التحدث',
      step: 1,
      steps: 5,
      remaining: '43m 16s',
      lines: [
        'مارس محادثة ثنائية مع Riyad',
        'ادخل في محادثة مطورة بالذكاء الاصطناعي لدينا واحصل على تحليل مفصل لكلامك',
      ],
    },
    {
      slug: 'writing',
      heading: 'Loay for Writing!',
      partner: 'Loay',
      color: '#35a5dd',
      cta: 'إبدأ الكتابة',
      step: 2,
      steps: 5,
      remaining: '43m 16s',
      lines: [
        'مارس محادثة ثنائية مع Loay',
        'اكتب مقالات، رسائل، أو تقارير',
        'احصل على تقييم فوري للبنية، القواعد، المفردات، والأسلوب',
      ],
    },
  ],
};

export const SPEAKING_BRIEFING: SpeakingBriefing = {
  title: 'تحدث مع رياض!',
  subtitle: 'ممارسة المحادثة مع الذكاء الإصطناعي',
  step: 3,
  steps: 5,
  remaining: '43m 16s',
  bullets: [
    'مارس المحادثات الحقيقية مع رياض. شريكك الذكي في التحدث!',
    'تحدث بحرية وحسن طلاقتك',
    'احصل على ملاحظات فورية حول النطق والقواعد',
    'بعد الانتهاء اضغط على ✓ للحصول على تقييم مفصل!',
    'مدة التحدث محدودة',
    'قم بالترقية للحصول على جلسات تدريب غير محدودة!',
  ],
};

export const WRITING_BRIEFING: WritingBriefing = {
  title: 'نافذة تعليمات الكتابة مع لؤي!',
  step: 3,
  steps: 5,
  remaining: '43m 16s',
  closing: 'جاهز لتحسين مهاراتك في الكتابة؟ لنبدأ!',
  groups: [
    {
      title: 'كيف يعمل هذا التمرين؟',
      bullets: [
        'أجب على السؤال في نطاق 150-200 حرف.',
        'إحصل على نسخة مصححة من إجابتك.',
        'اكتشف ماقمت به بشكل صحيح ونقاط التحسين.',
      ],
    },
    {
      title: 'كيفية الاستخدام؟',
      bullets: [
        'اضغط «التالي» للحصول على سؤال جديد.',
        'اضغط «إرسال» لرؤية تحليل الذكاء الاصطناعي عند الانتهاء.',
      ],
    },
  ],
};
