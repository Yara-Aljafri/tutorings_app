import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useContent } from '@/api';
import { SectionIcon, StepDots, TimerChip } from '@/components/ui';
import { PRACTICE, PracticePayload } from '@/content';
import { colors, rtlText, sectionColor, shadows } from '@/theme';

export default function PracticeHomeScreen() {
  const { data } = useContent<PracticePayload>('/api/practice', PRACTICE);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <LinearGradient
        colors={['#79c698', '#35a5dd', '#8e81f2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.greeting, shadows.soft]}
      >
        <View style={styles.greetingAvatar} />
        <View style={styles.flex}>
          <Text style={[styles.greetingTitle, rtlText]}>{data.greeting.title}</Text>
          <Text style={[styles.greetingSubtitle, rtlText]}>{data.greeting.subtitle}</Text>
        </View>
      </LinearGradient>

      {data.partners.map((partner) => (
        <View key={partner.slug} style={styles.partnerBlock}>
          <View style={[styles.partnerCard, shadows.card]}>
            <View style={[styles.partnerHeader, { backgroundColor: sectionColor[partner.slug] }]}>
              <SectionIcon section={partner.slug} size={22} />
              <Text style={styles.partnerHeading}>{partner.heading}</Text>
            </View>

            <View style={styles.partnerBody}>
              <View style={[styles.partnerDot, { backgroundColor: sectionColor[partner.slug] }]} />
              <View style={styles.flex}>
                {partner.lines.map((line) => (
                  <Text key={line} style={[styles.partnerLine, rtlText]}>
                    {line}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.partnerFooter}>
              <StepDots step={partner.step} steps={partner.steps} section={partner.slug} />

              <Link href={{ pathname: '/practice/[slug]', params: { slug: partner.slug } }} asChild>
                <Pressable
                  style={StyleSheet.flatten([
                    styles.cta,
                    { backgroundColor: sectionColor[partner.slug] },
                  ])}
                >
                  <Text style={styles.ctaText}>{partner.cta}</Text>
                  <Ionicons name="arrow-back" size={16} color="#fff" />
                </Pressable>
              </Link>
            </View>
          </View>

          <TimerChip remaining={partner.remaining} section={partner.slug} style={styles.timer} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 12, paddingBottom: 32 },
  flex: { flex: 1 },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  greetingAvatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#fff' },
  greetingTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  greetingSubtitle: { color: '#fff', fontWeight: '500', marginTop: 4 },
  partnerBlock: { marginTop: 20 },
  partnerCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  partnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 44,
  },
  partnerHeading: { color: '#fff', fontSize: 20, fontWeight: '700' },
  partnerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  partnerDot: { width: 48, height: 48, borderRadius: 24 },
  partnerLine: { fontWeight: '500', color: colors.ink, lineHeight: 22 },
  partnerFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  ctaText: { color: '#fff', fontWeight: '500' },
  timer: { marginLeft: 12 },
});
