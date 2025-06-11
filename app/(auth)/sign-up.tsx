import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

const EXPERIENCE_LEVELS = [
  'Fresher',
  'Associate',
  'Mid-Level',
  'Senior',
  'Lead',
  'Manager',
  'Architect',
  'Principal'
];

const INTERVIEW_FOCUS_AREAS = [
  'Behavioural',
  'System Design',
  'Coding',
  'HR',
  'Leadership',
  'Problem Solving',
  'Technical',
  'Communication',
  'Project Management',
  'Agile/Scrum'
];

type ValidationErrors = {
  fullName?: string;
  email?: string;
  mobile?: string;
  password?: string;
  confirmPassword?: string;
  jobRole?: string;
  experienceLevel?: string;
  interviewFocus?: string;
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(phone);
};

const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateForm = (formData: any, currentStep: number): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (currentStep === 1) {
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!validatePhone(formData.mobile)) {
      errors.mobile = 'Please enter a valid phone number';
    }
  }

  if (currentStep === 2) {
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  if (currentStep === 3) {
    if (!formData.jobRole) {
      errors.jobRole = 'Please select a job role';
    }

    if (!formData.experienceLevel) {
      errors.experienceLevel = 'Please select your experience level';
    }

    if (formData.interviewFocus.length === 0) {
      errors.interviewFocus = 'Please select at least one focus area';
    }
  }

  return errors;
};

type PasswordStrength = {
  score: number;
  label: string;
  color: string;
};

const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return { score: 0, label: '', color: '#E2E8F0' };
  }

  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character type checks
  if (/[A-Z]/.test(password)) score += 1; // Uppercase
  if (/[a-z]/.test(password)) score += 1; // Lowercase
  if (/[0-9]/.test(password)) score += 1; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special characters

  // Calculate percentage
  const percentage = (score / 6) * 100;

  // Determine strength level
  if (percentage < 30) {
    return { score: percentage, label: 'Weak', color: '#EF4444' };
  } else if (percentage < 60) {
    return { score: percentage, label: 'Medium', color: '#F59E0B' };
  } else if (percentage < 90) {
    return { score: percentage, label: 'Strong', color: '#10B981' };
  } else {
    return { score: percentage, label: 'Very Strong', color: '#059669' };
  }
};

export default function SignUp() {
  const router = useRouter();
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    jobRole: '',
    experienceLevel: '',
    interviewFocus: [] as string[],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const passwordStrength = useMemo(() => calculatePasswordStrength(formData.password), [formData.password]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNext = async () => {
    const validationErrors = validateForm(formData, currentStep);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        try {
          // Split full name into first and last name
          const [firstName, ...lastNameParts] = formData.fullName.trim().split(' ');
          const lastName = lastNameParts.join(' ');

          // Format mobile number (remove any non-digit characters)
          const formattedMobile = formData.mobile.replace(/\D/g, '');

          // Prepare the user data
          const userData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            mobile: formattedMobile,
            jobRole: formData.jobRole || 'Not Specified',
            experienceLevel: formData.experienceLevel || 'Fresher',
            interviewFocus: formData.interviewFocus || ['General']
          };

          // Log the data being sent
          console.log('Sending user data:', {
            ...userData,
            password: '[REDACTED]'
          });


          const API_URL = 'http://192.168.29.28:5000/api/auth/signup';
          console.log('Attempting to connect to:', API_URL);

          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          console.log('Response status:', response.status);
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
          }

          const data = await response.json();
          console.log('Response data:', data);

          if (data.success) {
            // Show success message with better formatting
            Alert.alert(
              '🎉 Account Created Successfully!',
              'Your account has been created. You can now sign in to continue.',
              [
                {
                  text: 'Sign In',
                  onPress: () => router.replace('/sign-in'),
                  style: 'default'
                }
              ],
              { cancelable: false }
            );
          } else {
            throw new Error(data.message || 'Signup failed');
          }
        } catch (error: any) {
          console.error('Signup error:', error);
          Alert.alert(
            'Signup Failed',
            error.message || 'Unable to create account. Please try again.',
            [{ text: 'OK', style: 'default' }]
          );
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleInterviewFocus = (area: string) => {
    setFormData(prev => ({
      ...prev,
      interviewFocus: prev.interviewFocus.includes(area)
        ? prev.interviewFocus.filter(f => f !== area)
        : [...prev.interviewFocus, area]
    }));
    setTouched(prev => ({ ...prev, interviewFocus: true }));
    if (errors.interviewFocus) {
      setErrors(prev => ({ ...prev, interviewFocus: undefined }));
    }
  };

  const renderError = (field: keyof ValidationErrors) => {
    if (errors[field] && touched[field]) {
      return (
        <View style={styles.errorContainer}>
          <AlertCircle size={14} color="#EF4444" />
          <Text style={styles.errorText}>{errors[field]}</Text>
        </View>
      );
    }
    return null;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Animated.View entering={FadeInDown.duration(500)}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.replace('/')}
            >
              <ChevronLeft size={24} color={colors.text} />
              <Text style={[styles.backButtonText, { color: colors.text }]}>Back</Text>
            </TouchableOpacity>
            
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <User size={20} color="#3D5AF1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={formData.fullName}
                onChangeText={(text) => handleFieldChange('fullName', text)}
                onBlur={() => setTouched(prev => ({ ...prev, fullName: true }))}
              />
            </View>
            {renderError('fullName')}

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Mail size={20} color="#3D5AF1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleFieldChange('email', text.toLowerCase())}
                autoCapitalize="none"
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
              />
            </View>
            {renderError('email')}

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Phone size={20} color="#3D5AF1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={formData.mobile}
                onChangeText={(text) => handleFieldChange('mobile', text)}
                onBlur={() => setTouched(prev => ({ ...prev, mobile: true }))}
              />
            </View>
            {renderError('mobile')}
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View entering={FadeInDown.duration(500)}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Lock size={20} color="#3D5AF1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => handleFieldChange('password', text)}
                onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                {showPassword ? <EyeOff size={20} color="#94A3B8" /> : <Eye size={20} color="#94A3B8" />}
              </TouchableOpacity>
            </View>
            {renderError('password')}

            {formData.password.length > 0 && (
              <View style={styles.passwordStrengthContainer}>
                <View style={styles.passwordStrengthBar}>
                  <Animated.View 
                    style={[
                      styles.passwordStrengthFill,
                      { 
                        width: `${passwordStrength.score}%`,
                        backgroundColor: passwordStrength.color
                      }
                    ]}
                  />
                </View>
                <Text style={[styles.passwordStrengthText, { color: passwordStrength.color }]}>
                  {passwordStrength.label}
                </Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Lock size={20} color="#3D5AF1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(text) => handleFieldChange('confirmPassword', text)}
                onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                {showConfirmPassword ? <EyeOff size={20} color="#94A3B8" /> : <Eye size={20} color="#94A3B8" />}
              </TouchableOpacity>
            </View>
            {renderError('confirmPassword')}
          </Animated.View>
        );
      case 3:
        return (
          <Animated.View entering={FadeInDown.duration(500)}>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={formData.jobRole}
                onValueChange={(value: string) => handleFieldChange('jobRole', value)}
                style={[styles.picker, { height: 60 }]}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Select Job Role" value="" />
                <Picker.Item label="Software Engineer" value="software_engineer" />
                <Picker.Item label="Frontend Developer" value="frontend_developer" />
                <Picker.Item label="Backend Developer" value="backend_developer" />
                <Picker.Item label="Full Stack Developer" value="full_stack_developer" />
                <Picker.Item label="DevOps Engineer" value="devops_engineer" />
                <Picker.Item label="Mobile Developer" value="mobile_developer" />
                <Picker.Item label="Data Engineer" value="data_engineer" />
                <Picker.Item label="Data Scientist" value="data_scientist" />
                <Picker.Item label="Machine Learning Engineer" value="ml_engineer" />
                <Picker.Item label="QA Engineer" value="qa_engineer" />
                <Picker.Item label="Security Engineer" value="security_engineer" />
                <Picker.Item label="Cloud Engineer" value="cloud_engineer" />
                <Picker.Item label="Product Manager" value="product_manager" />
                <Picker.Item label="Project Manager" value="project_manager" />
                <Picker.Item label="Technical Lead" value="technical_lead" />
                <Picker.Item label="Engineering Manager" value="engineering_manager" />
                <Picker.Item label="Solutions Architect" value="solutions_architect" />
              </Picker>
            </View>
            {renderError('jobRole')}

            <Text style={styles.sectionTitle}>Experience Level</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.experienceContainer}>
              {EXPERIENCE_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.experienceButton,
                    formData.experienceLevel === level && styles.experienceButtonActive
                  ]}
                  onPress={() => handleFieldChange('experienceLevel', level)}
                >
                  <Text style={[
                    styles.experienceButtonText,
                    formData.experienceLevel === level && styles.experienceButtonTextActive
                  ]}>{level}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {renderError('experienceLevel')}

            <Text style={styles.sectionTitle}>Interview Focus Areas</Text>
            <View style={styles.focusContainer}>
              {INTERVIEW_FOCUS_AREAS.map((area) => (
                <TouchableOpacity
                  key={area}
                  style={[
                    styles.focusButton,
                    formData.interviewFocus.includes(area) && styles.focusButtonActive
                  ]}
                  onPress={() => toggleInterviewFocus(area)}
                >
                  <Text style={[
                    styles.focusButtonText,
                    formData.interviewFocus.includes(area) && styles.focusButtonTextActive
                  ]}>{area}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {renderError('interviewFocus')}
          </Animated.View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            entering={FadeInDown.delay(100).duration(700)} 
            style={styles.logoContainer}
          >
            <Image
              source={require('@/assets/images/main-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.logoText, { color: '#1E293B' }]}>NeuroVue</Text>
            <Text style={[styles.tagline, { color: '#64748B' }]}>Your AI Interview Assistant</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(300).duration(700)}
            style={[styles.formContainer, { backgroundColor: '#FFFFFF' }]}
          >
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <Animated.View 
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
            </View>

            <Text style={[styles.title, { color: '#1E293B' }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: '#64748B' }]}>
              {currentStep === 1 ? 'Tell us about yourself' :
               currentStep === 2 ? 'Create a secure password' :
               'Customize your experience'}
            </Text>
            
            {renderStep()}

            <View style={styles.navigationButtons}>
              {currentStep > 1 && (
                <TouchableOpacity 
                  style={styles.navButton}
                  onPress={handleBack}
                >
                  <ChevronLeft size={24} color="#3D5AF1" />
                </TouchableOpacity>
              )}
              {currentStep === 3 ? (
                <TouchableOpacity 
                  style={[styles.navButton, styles.nextButton, styles.createAccountButton]}
                  onPress={handleNext}
                >
                  <Text style={styles.createAccountButtonText}>Create Account</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={[styles.navButton, styles.nextButton]}
                  onPress={handleNext}
                >
                  <ChevronRight size={24} color="#FFFFFF" />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  formContainer: {
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3D5AF1',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  eyeIcon: {
    padding: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    gap: 12,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#3D5AF1',
  },
  picker: {
    flex: 1,
    height: 60,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  pickerItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 12,
  },
  experienceContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingVertical: 8,
  },
  experienceButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  experienceButtonActive: {
    backgroundColor: '#3D5AF1',
  },
  experienceButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  experienceButtonTextActive: {
    color: '#FFFFFF',
  },
  focusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  focusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    minWidth: 120,
    alignItems: 'center',
  },
  focusButtonActive: {
    backgroundColor: '#3D5AF1',
  },
  focusButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  focusButtonTextActive: {
    color: '#FFFFFF',
  },
  passwordStrengthContainer: {
    marginBottom: 16,
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    textAlign: 'right',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
    marginLeft: 4,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#EF4444',
    marginLeft: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
  createAccountButton: {
    flex: 1,
    marginLeft: 12,
  },
  createAccountButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});