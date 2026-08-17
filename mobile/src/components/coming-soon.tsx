import { StyleSheet, Text, View } from 'react-native';

import { colors, rtlText, shadows } from '@/theme';

/**
 * The tabs that had no screens in the Rails app still have none — they say so
 * rather than opening an empty page.
 */
export function ComingSoon({ title }: { title: string }) {
  return (
    <View style={styles.page}>
      <View style={[styles.card, shadows.card]}>
        <Text style={[styles.title, rtlText]}>{title}</Text>
        <Text style={[styles.body, rtlText]}>هذا القسم قيد التطوير</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 24, gap: 8 },
  title: { fontSize: 20, fontWeight: '700', color: colors.ink },
  body: { color: colors.muted },
});
