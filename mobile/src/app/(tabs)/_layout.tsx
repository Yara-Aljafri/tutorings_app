import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { colors } from '@/theme';

/**
 * The bottom bar of the web app, tab for tab. Community, analytics and plan
 * have no screens yet — they are the same placeholders they were in Rails.
 */
const ICONS: Record<string, { idle: ImageSourcePropType; active: ImageSourcePropType }> = {
  community: {
    idle: require('@/assets/images/nav/community.png'),
    active: require('@/assets/images/nav/community-filled.png'),
  },
  analytics: {
    idle: require('@/assets/images/nav/time.png'),
    active: require('@/assets/images/nav/time-filled.png'),
  },
  index: {
    idle: require('@/assets/images/nav/book.png'),
    active: require('@/assets/images/nav/book.png'),
  },
  plan: {
    idle: require('@/assets/images/nav/pipeline.png'),
    active: require('@/assets/images/nav/pipeline-filled.png'),
  },
  practice: {
    idle: require('@/assets/images/nav/puzzle.png'),
    active: require('@/assets/images/nav/puzzle-filled.png'),
  },
};

function TabIcon({ name, focused }: { name: keyof typeof ICONS; focused: boolean }) {
  return (
    <View style={styles.tabIcon}>
      {focused ? <View style={styles.activeBar} /> : null}
      <Image source={focused ? ICONS[name].active : ICONS[name].idle} style={styles.icon} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#34a6dd',
        tabBarInactiveTintColor: 'transparent',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="community"
        options={{
          title: 'المجتمع',
          tabBarIcon: ({ focused }) => <TabIcon name="community" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'التحليلات',
          tabBarIcon: ({ focused }) => <TabIcon name="analytics" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabIcon name="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: 'الخطة',
          tabBarIcon: ({ focused }) => <TabIcon name="plan" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'التدريبات',
          tabBarIcon: ({ focused }) => <TabIcon name="practice" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: 0,
    height: 64,
    paddingTop: 6,
  },
  tabIcon: { alignItems: 'center', justifyContent: 'center', width: 48, paddingTop: 4 },
  activeBar: {
    position: 'absolute',
    top: -10,
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#34a6dd',
  },
  icon: { width: 28, height: 28, resizeMode: 'contain' },
  tabLabel: { fontSize: 11 },
});
