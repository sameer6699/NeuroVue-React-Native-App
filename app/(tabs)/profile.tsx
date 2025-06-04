import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight, Bell, Shield, CreditCard as Edit } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(100).duration(500)}
          style={styles.header}
        >
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card }]}>
            <Settings size={20} color={colors.primary} />
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(200).duration(500)}
          style={[styles.profileCard, { backgroundColor: colors.card }]}
        >
          <View style={styles.profileContent}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }} 
              style={styles.profileImage} 
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {user?.name || 'Jane Doe'}
              </Text>
              <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                {user?.email || 'jane@example.com'}
              </Text>
            </View>
            <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.border }]}>
              <Edit size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>26</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Interviews</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>76%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg. Score</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Hours</Text>
            </View>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          
          <View style={styles.settingsList}>
            <View style={[styles.settingsItem, { backgroundColor: colors.card }]}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#E0DBFF' }]}>
                  <Moon size={20} color="#915EFF" />
                </View>
                <Text style={[styles.settingsLabel, { color: colors.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: '#915EFF' }}
                thumbColor="#FFFFFF"
              />
            </View>
            
            <View style={[styles.settingsItem, { backgroundColor: colors.card }]}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#FFE4D9' }]}>
                  <Bell size={20} color="#FE7A36" />
                </View>
                <Text style={[styles.settingsLabel, { color: colors.text }]}>Notifications</Text>
              </View>
              <TouchableOpacity>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <View style={[styles.settingsItem, { backgroundColor: colors.card }]}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#DCFCE7' }]}>
                  <Shield size={20} color="#22C55E" />
                </View>
                <Text style={[styles.settingsLabel, { color: colors.text }]}>Privacy</Text>
              </View>
              <TouchableOpacity>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          
          <View style={styles.settingsList}>
            <View style={[styles.settingsItem, { backgroundColor: colors.card }]}>
              <View style={styles.settingsItemLeft}>
                <View style={[styles.settingsIconContainer, { backgroundColor: '#D1E9FF' }]}>
                  <HelpCircle size={20} color="#3D5AF1" />
                </View>
                <Text style={[styles.settingsLabel, { color: colors.text }]}>Help & Support</Text>
              </View>
              <TouchableOpacity>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.section}
        >
          <TouchableOpacity 
            style={[styles.logoutButton, { backgroundColor: colors.card }]}
            onPress={signOut}
          >
            <LogOut size={20} color="#EF4444" />
            <Text style={[styles.logoutText, { color: '#EF4444' }]}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  profileContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  settingsList: {
    paddingHorizontal: 24,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  logoutButton: {
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
});