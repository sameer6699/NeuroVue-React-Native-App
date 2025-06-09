import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight, Bell, Shield, CreditCard as Edit, Info } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_PREFERENCE_KEY = '@theme_preference';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (savedTheme !== null) {
          setTheme(savedTheme as 'light' | 'dark');
        } else {
          // If no saved preference, default to light theme
          setTheme('light');
          await AsyncStorage.setItem(THEME_PREFERENCE_KEY, 'light');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
        // Default to light theme on error
        setTheme('light');
      }
    };

    loadThemePreference();
  }, []);

  const PrivacyPolicyModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={privacyModalVisible}
      onRequestClose={() => setPrivacyModalVisible(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Privacy Policy</Text>
            <TouchableOpacity onPress={() => setPrivacyModalVisible(false)}>
              <Text style={[styles.closeButton, { color: colors.primary }]}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody}>
            <Text style={[styles.privacyText, { color: colors.text }]}>
              1. Information Collection{'\n\n'}
              We collect information that you provide directly to us, including your name, email address, and any other information you choose to provide.{'\n\n'}
              2. Information Usage{'\n\n'}
              We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and users.{'\n\n'}
              3. Information Sharing{'\n\n'}
              We do not share your personal information with companies, organizations, or individuals outside of our company except in the following cases:{'\n\n'}
              • With your consent{'\n'}
              • For legal reasons{'\n\n'}
              4. Data Security{'\n\n'}
              We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.{'\n\n'}
              5. Your Rights{'\n\n'}
              You have the right to access, correct, or delete your personal information. You can also object to our processing of your personal information.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

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
          <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
            <View style={styles.profileContent}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }} 
                style={styles.profileImage} 
              />
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={[styles.profileName, { color: colors.text }]}>
                    {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
                  </Text>
                  <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.border }]}>
                    <Settings size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>
                  {user?.email || 'jane@example.com'}
                </Text>
              </View>
            </View>
            
            <View style={[styles.statsContainer, { borderTopColor: colors.border }]}>
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
                <View style={[styles.settingsIconContainer, { backgroundColor: '#D1E9FF' }]}>
                  <Info size={20} color="#3D5AF1" />
                </View>
                <Text style={[styles.settingsLabel, { color: colors.text }]}>Additional Information</Text>
              </View>
              <TouchableOpacity>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

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
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={[styles.settingsLabel, { color: colors.text }]}>Notifications</Text>
                </TouchableOpacity>
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
                <TouchableOpacity 
                  style={styles.buttonContainer}
                  onPress={() => setPrivacyModalVisible(true)}
                >
                  <Text style={[styles.settingsLabel, { color: colors.text }]}>Privacy</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setPrivacyModalVisible(true)}>
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
      <PrivacyPolicyModal />
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
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  profileCard: {
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  closeButton: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  modalBody: {
    padding: 16,
  },
  privacyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});