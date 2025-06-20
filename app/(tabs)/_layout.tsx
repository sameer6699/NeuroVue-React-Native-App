import { Tabs } from 'expo-router';
import { Home, History, User, Brain, Bot, FileText } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 45 + insets.bottom,
          paddingBottom: insets.bottom / 3,
          backgroundColor: colors.card,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginBottom: 8,
        },
        headerStyle: {
          backgroundColor: colors.card,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
          fontSize: 18,
          color: colors.text,
        },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ats-resume"
        options={{
          title: 'Resume Analyzer',
          headerTitle: 'Resume Analyzer',
          tabBarIcon: ({ color, size }) => <FileText size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="interviews"
        options={{
          title: 'AI-Mock Interview',
          headerTitle: 'AI-Mock Interview',
          tabBarIcon: ({ color, size }) => <Brain size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="copilot"
        options={{
          title: 'Co-pilot',
          headerTitle: 'Interview Co-pilot',
          tabBarIcon: ({ color, size }) => <Bot size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerTitle: 'Interview History',
          tabBarIcon: ({ color, size }) => <History size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Your Profile',
          tabBarIcon: ({ color, size }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}