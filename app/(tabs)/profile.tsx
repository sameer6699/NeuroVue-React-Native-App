import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings, Moon, CircleHelp as HelpCircle, LogOut, ChevronRight, Bell, Shield, CreditCard as Edit, Info, Phone, Briefcase, Award, Target, Upload, Camera } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const THEME_PREFERENCE_KEY = '@theme_preference';
const PROFILE_IMAGE_KEY = '@profile_image';

// Job role mapping object
const JOB_ROLE_MAPPING: { [key: string]: string } = {
  'software_engineer': 'Software Engineer',
  'frontend_developer': 'Frontend Developer',
  'backend_developer': 'Backend Developer',
  'full_stack_developer': 'Full Stack Developer',
  'devops_engineer': 'DevOps Engineer',
  'mobile_developer': 'Mobile Developer',
  'data_engineer': 'Data Engineer',
  'data_scientist': 'Data Scientist',
  'ml_engineer': 'Machine Learning Engineer',
  'qa_engineer': 'QA Engineer',
  'security_engineer': 'Security Engineer',
  'cloud_engineer': 'Cloud Engineer',
  'product_manager': 'Product Manager',
  'project_manager': 'Project Manager',
  'technical_lead': 'Technical Lead',
  'engineering_manager': 'Engineering Manager',
  'solutions_architect': 'Solutions Architect'
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggleTheme, setTheme } = useTheme();
  const { user, signOut, updateUser } = useAuth();
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load saved theme preference and profile image
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Load theme preference
        const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (savedTheme !== null) {
          setTheme(savedTheme as 'light' | 'dark');
        } else {
          setTheme('light');
          await AsyncStorage.setItem(THEME_PREFERENCE_KEY, 'light');
        }

        // Load profile image from user data
        if (user?.profileImage) {
          setProfileImage(user.profileImage);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        setTheme('light');
      }
    };

    loadSavedData();
  }, [user]);

  const handleImageUpload = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to access your photos');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0].uri) {
        setIsUploading(true);
        
        try {
          console.log('Starting image upload process...');
          console.log('User ID:', user?.id);
          
          // Convert image to base64
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Prepare the image data
          const imageData = `data:image/jpeg;base64,${base64}`;
          console.log('Image converted to base64');

          const API_URL = 'http://192.168.31.244:5000/api/users/update-profile';
          console.log('Sending request to:', API_URL);

          // Update user profile in database
          const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              userId: user?.id,
              profileImage: imageData
            }),
          });

          console.log('Response status:', response.status);
          const responseText = await response.text();
          console.log('Response text:', responseText);

          if (!response.ok) {
            throw new Error(`Failed to update profile image: ${responseText}`);
          }

          const data = JSON.parse(responseText);
          console.log('Response data:', data);
          
          if (data.success) {
            // Update local state
            setProfileImage(imageData);
            // Update auth context with all required user properties
            if (user) {
              updateUser({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile,
                jobRole: user.jobRole,
                experienceLevel: user.experienceLevel,
                interviewFocus: user.interviewFocus,
                profileImage: imageData
              });
            }
            Alert.alert('Success', 'Profile picture updated successfully');
          } else {
            throw new Error(data.message || 'Failed to update profile image');
          }
        } catch (error: any) {
          console.error('Detailed error:', error);
          Alert.alert('Error', `Failed to upload image: ${error.message}`);
        } finally {
          setIsUploading(false);
        }
      }
    } catch (error) {
      console.error('Error in image picker:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  // Function to get display job role
  const getDisplayJobRole = (role: string) => {
    return JOB_ROLE_MAPPING[role] || role;
  };

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
              <View style={styles.profileImageContainer}>
                <OptimizedImage 
                  source={{ uri: profileImage || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }} 
                  style={styles.profileImage}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                />
                <TouchableOpacity 
                  style={[
                    styles.uploadButton, 
                    { 
                      backgroundColor: colors.primary,
                      opacity: isUploading ? 0.7 : 1 
                    }
                  ]}
                  onPress={handleImageUpload}
                  disabled={isUploading}
                >
                  <Camera size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={[styles.profileName, { color: colors.text }]}>
                    {user ? `${user.firstName} ${user.lastName}` : 'Jane Doe'}
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

            {/* Additional User Information */}
            <View style={[styles.additionalInfoContainer, { borderTopColor: colors.border }]}>
              <View style={styles.additionalInfoItem}>
                <View style={styles.additionalInfoIconContainer}>
                  <Phone size={16} color={colors.primary} />
                </View>
                <View style={styles.additionalInfoTextContainer}>
                  <Text style={[styles.additionalInfoLabel, { color: colors.textSecondary }]}>Mobile Number</Text>
                  <Text style={[styles.additionalInfoValue, { color: colors.text }]}>
                    {user?.mobile || 'Not provided'}
                  </Text>
                </View>
              </View>

              <View style={styles.additionalInfoItem}>
                <View style={styles.additionalInfoIconContainer}>
                  <Briefcase size={16} color={colors.primary} />
                </View>
                <View style={styles.additionalInfoTextContainer}>
                  <Text style={[styles.additionalInfoLabel, { color: colors.textSecondary }]}>Job Role</Text>
                  <Text style={[styles.additionalInfoValue, { color: colors.text }]}>
                    {user?.jobRole ? getDisplayJobRole(user.jobRole) : 'Not provided'}
                  </Text>
                </View>
              </View>

              <View style={styles.additionalInfoItem}>
                <View style={styles.additionalInfoIconContainer}>
                  <Award size={16} color={colors.primary} />
                </View>
                <View style={styles.additionalInfoTextContainer}>
                  <Text style={[styles.additionalInfoLabel, { color: colors.textSecondary }]}>Experience Level</Text>
                  <Text style={[styles.additionalInfoValue, { color: colors.text }]}>
                    {user?.experienceLevel || 'Not provided'}
                  </Text>
                </View>
              </View>

              <View style={styles.additionalInfoItem}>
                <View style={styles.additionalInfoIconContainer}>
                  <Target size={16} color={colors.primary} />
                </View>
                <View style={styles.additionalInfoTextContainer}>
                  <Text style={[styles.additionalInfoLabel, { color: colors.textSecondary }]}>Interview Focus</Text>
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.focusScrollContainer}
                  >
                    {user?.interviewFocus?.map((focus, index) => (
                      <View 
                        key={index} 
                        style={[
                          styles.focusButton,
                          { backgroundColor: colors.card }
                        ]}
                      >
                        <Text style={[styles.focusButtonText, { color: colors.text }]}>
                          {focus}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
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
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  additionalInfoContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  additionalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  additionalInfoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(61, 90, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  additionalInfoTextContainer: {
    flex: 1,
  },
  additionalInfoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  additionalInfoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  focusScrollContainer: {
    marginTop: 4,
  },
  focusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(61, 90, 241, 0.2)',
  },
  focusButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  uploadButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});