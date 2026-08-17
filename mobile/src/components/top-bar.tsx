/**
 * The gradient bar at the top of every screen, matching the Phoenix app shell.
 */

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const USER_NAME = 'رياض للتحدث';

export function TopBar({ canGoBack }: { canGoBack?: boolean }) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#7f60ea', '#647fe8', '#34a6dd', '#39acad']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.bar, { paddingTop: insets.top, height: 56 + insets.top }]}
    >
      <View style={styles.side}>
        <Pressable
          accessibilityLabel="رجوع"
          onPress={() => (canGoBack && router.canGoBack() ? router.back() : router.replace('/'))}
          style={styles.circle}
        >
          <Image source={require('@/assets/images/nav/back_arrow.png')} style={styles.smallIcon} />
        </Pressable>

        <Pressable accessibilityLabel="المساعد" style={styles.circle}>
          <Image source={require('@/assets/images/nav/ask_bot.png')} style={styles.smallIcon} />
        </Pressable>
      </View>

      <View style={styles.user}>
        <Text style={styles.userName}>{USER_NAME}</Text>
        <View style={styles.circle}>
          <Image source={require('@/assets/images/nav/profile.png')} style={styles.avatar} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  side: { flexDirection: 'row', gap: 8 },
  user: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  userName: { color: '#fff', fontSize: 15 },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  smallIcon: { width: 18, height: 18, resizeMode: 'contain' },
  avatar: { width: 32, height: 32, resizeMode: 'contain' },
});
