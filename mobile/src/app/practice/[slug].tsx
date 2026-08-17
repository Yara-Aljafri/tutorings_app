import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useContent } from '@/api';
import { Bullet, SectionIcon, StepDots, TimerChip } from '@/components/ui';
import {
  SPEAKING_BRIEFING,
  SpeakingBriefing,
  WRITING_BRIEFING,
  WritingBriefing,
} from '@/content';
import { colors, rtlText, sectionColor, shadows } from '@/theme';

type Slug = 'speaking' | 'writing';

/** The briefing shown before a practice session with Riyad or Loay begins. */
export default function PracticeBriefingScreen() {
  const { slug } = useLocalSearchParams<{ slug: Slug }>();
  const speaking = slug !== 'writing';
  const { data } = useContent<{ briefing: SpeakingBriefing | WritingBriefing }>(
    `/api/practice/${speaking ? 'speaking' : 'writing'}`,
    { briefing: speaking ? SPEAKING_BRIEFING : WRITING_BRIEFING }
  );

  const briefing = data.briefing;
  const section: Slug = speaking ? 'speaking' : 'writing';

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={[styles.card, shadows.card]}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: sectionColor[section] }]}>{briefing.title}</Text>
          <SectionIcon section={section} size={28} color={sectionColor[section]} />
        </View>

        {'subtitle' in briefing ? <Text style={styles.subtitle}>{briefing.subtitle}</Text> : null}

        <View style={styles.avatar}>
          <Ionicons name="person-circle" size={128} color={colors.brandNavy} />
        </View>

        {'bullets' in briefing ? (
          <View style={styles.bullets}>
            {briefing.bullets.map((bullet) => (
              <Bullet key={bullet}>{bullet}</Bullet>
            ))}
          </View>
        ) : (
          <View style={styles.groups}>
            {briefing.groups.map((group) => (
              <View key={group.title} style={styles.group}>
                <Text style={[styles.groupTitle, rtlText]}>{group.title}</Text>
                {group.bullets.map((bullet) => (
                  <Bullet key={bullet}>{bullet}</Bullet>
                ))}
              </View>
            ))}

            <View style={styles.closingRow}>
              <Text style={[styles.closing, rtlText]}>{briefing.closing}</Text>
              <Ionicons name="bulb" size={18} color="#cccccc" />
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <StepDots step={briefing.step} steps={briefing.steps} section={section} />

          <View style={styles.actions}>
            <Pressable style={styles.actionButton}>
              <Ionicons name="chevron-up" size={16} color="#fff" />
              <Text style={styles.actionText}>ترقية</Text>
            </Pressable>
            <Pressable style={styles.actionButton}>
              <Ionicons name="arrow-back" size={16} color="#fff" />
              <Text style={styles.actionText}>إبدأ</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <TimerChip remaining={briefing.remaining} section={section} style={styles.timer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 12, paddingBottom: 32 },
  card: { backgroundColor: colors.card, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  subtitle: { fontSize: 18, textAlign: 'center', marginTop: 12, color: colors.ink },
  avatar: { alignItems: 'center', marginVertical: 32 },
  bullets: { gap: 6 },
  groups: { gap: 16, marginTop: 8 },
  group: { gap: 6 },
  groupTitle: { fontWeight: '700', color: colors.ink },
  closingRow: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8 },
  closing: { fontWeight: '700', color: colors.ink },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  actions: { flexDirection: 'row', gap: 8 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.brandNavy,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: { color: '#fff' },
  timer: { marginLeft: 20 },
});
