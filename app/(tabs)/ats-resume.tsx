import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FileText, Upload, AlertCircle, CheckCircle2, XCircle, Search, Briefcase, Building2, FileText as FileTextIcon, Building } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { getApiUrl, ENV } from '@/config/env';

const { width } = Dimensions.get('window');

export default function ATSResumeScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [resumeFile, setResumeFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [errors, setErrors] = useState<{
    resume?: string;
    jobTitle?: string;
    companyName?: string;
    industry?: string;
    jobDescription?: string;
    experienceLevel?: string;
  }>({});

  const experienceLevels = ['Student/Fresher', '1-3 Years', '3-6 Years', '6+ Years'];

  const validateFields = () => {
    const newErrors: typeof errors = {};
    
    if (!resumeFile) {
      newErrors.resume = 'Please upload your resume';
    }
    if (!jobTitle.trim()) {
      newErrors.jobTitle = 'Please enter your target job role';
    }
    if (!companyName.trim()) {
      newErrors.companyName = 'Please enter the company name';
    }
    if (!industry.trim()) {
      newErrors.industry = 'Please enter your industry/domain';
    }
    if (!experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
    }
    // Job Description is now optional, so we don't validate it

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAnalyze = async () => {
    if (!validateFields()) return;
    if (!resumeFile) return;

    try {
      // Read file as base64
      const base64 = await FileSystem.readAsStringAsync(resumeFile.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Prepare payload
      const payload = {
        jobTitle,
        companyName,
        industry,
        jobDescription,
        experienceLevel,
        resumeBase64: base64,
        fileName: resumeFile.name,
        fileType: resumeFile.mimeType || '',
      };

      const response = await fetch(getApiUrl(ENV.API_ENDPOINTS.RESUME_ANALYZE), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Alert.alert('Success', 'Resume analysis data stored successfully!');
        // Optionally reset form here
      } else {
        Alert.alert('Error', data.message || 'Failed to store resume analysis.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading your resume.');
    }
  };

  const handleResumeUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      
      if (file.size && file.size > 5 * 1024 * 1024) {
        Alert.alert(
          'File Too Large',
          'Please select a file smaller than 5MB',
          [{ text: 'OK' }]
        );
        return;
      }

      setResumeFile(file);
      setErrors(prev => ({ ...prev, resume: undefined }));
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to upload resume. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: insets.top + 16 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.uploadContainer}
        >
          <TouchableOpacity 
            style={[styles.uploadBox, { backgroundColor: colors.card }]}
            onPress={handleResumeUpload}
          >
            <LinearGradient
              colors={[colors.primary + '20', colors.primary + '05']}
              style={styles.uploadIconContainer}
            >
              {resumeFile ? (
                <CheckCircle2 size={32} color={colors.primary} />
              ) : (
                <Upload size={32} color={colors.primary} />
              )}
            </LinearGradient>
            <Text style={[styles.uploadTitle, { color: colors.text }]}>
              {resumeFile ? 'Resume Uploaded' : 'Upload Your Resume'}
            </Text>
            <Text style={[styles.uploadSubtitle, { color: colors.textSecondary }]}>
              {resumeFile 
                ? resumeFile.name
                : 'PDF, DOC, or DOCX (max 5MB)'}
            </Text>
            {resumeFile && (
              <TouchableOpacity 
                style={[styles.removeButton, { backgroundColor: colors.error + '20' }]}
                onPress={() => {
                  setResumeFile(null);
                  setErrors(prev => ({ ...prev, resume: undefined }));
                }}
              >
                <Text style={[styles.removeButtonText, { color: colors.error }]}>
                  Remove
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {errors.resume && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {errors.resume}
            </Text>
          )}
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.questionnaireContainer}
        >
          <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
            <View style={styles.questionHeader}>
              <Briefcase size={20} color={colors.primary} />
              <Text style={[styles.questionTitle, { color: colors.text }]}>Job Role / Target Position</Text>
            </View>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: errors.jobTitle ? colors.error : colors.border
              }]}
              placeholder="What job title/role are you applying for?"
              placeholderTextColor={colors.textSecondary}
              value={jobTitle}
              onChangeText={(text) => {
                setJobTitle(text);
                setErrors(prev => ({ ...prev, jobTitle: undefined }));
              }}
            />
            {errors.jobTitle && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.jobTitle}
              </Text>
            )}
          </View>

          <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
            <View style={styles.questionHeader}>
              <Building size={20} color={colors.primary} />
              <Text style={[styles.questionTitle, { color: colors.text }]}>Company Name (Required)</Text>
            </View>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: errors.companyName ? colors.error : colors.border
              }]}
              placeholder="Enter the company name you're applying to"
              placeholderTextColor={colors.textSecondary}
              value={companyName}
              onChangeText={(text) => {
                setCompanyName(text);
                setErrors(prev => ({ ...prev, companyName: undefined }));
              }}
            />
            {errors.companyName && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.companyName}
              </Text>
            )}
          </View>

          <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
            <View style={styles.questionHeader}>
              <Building2 size={20} color={colors.primary} />
              <Text style={[styles.questionTitle, { color: colors.text }]}>Industry/Domain</Text>
            </View>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: errors.industry ? colors.error : colors.border
              }]}
              placeholder="What is the industry/domain of interest?"
              placeholderTextColor={colors.textSecondary}
              value={industry}
              onChangeText={(text) => {
                setIndustry(text);
                setErrors(prev => ({ ...prev, industry: undefined }));
              }}
            />
            {errors.industry && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.industry}
              </Text>
            )}
          </View>

          <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
            <View style={styles.questionHeader}>
              <FileTextIcon size={20} color={colors.primary} />
              <Text style={[styles.questionTitle, { color: colors.text }]}>Job Description (Optional)</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea, { 
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.border
              }]}
              placeholder="Paste job description text here (optional)..."
              placeholderTextColor={colors.textSecondary}
              value={jobDescription}
              onChangeText={(text) => {
                setJobDescription(text);
                setErrors(prev => ({ ...prev, jobDescription: undefined }));
              }}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
            <View style={styles.questionHeader}>
              <Search size={20} color={colors.primary} />
              <Text style={[styles.questionTitle, { color: colors.text }]}>Experience Level</Text>
            </View>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.experienceScrollContent}
            >
              {experienceLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.experienceButton,
                    { 
                      backgroundColor: experienceLevel === level ? colors.primary : colors.background,
                      borderColor: errors.experienceLevel ? colors.error : colors.border
                    }
                  ]}
                  onPress={() => {
                    setExperienceLevel(level);
                    setErrors(prev => ({ ...prev, experienceLevel: undefined }));
                  }}
                >
                  <Text style={[
                    styles.experienceButtonText,
                    { color: experienceLevel === level ? '#FFFFFF' : colors.text }
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {errors.experienceLevel && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {errors.experienceLevel}
              </Text>
            )}
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.analyzeButtonContainer}
        >
          <TouchableOpacity 
            style={[styles.analyzeButton]}
            onPress={handleAnalyze}
          >
            <LinearGradient
              colors={[colors.primary, colors.primary + 'CC']}
              style={styles.analyzeButtonGradient}
            >
              <Text style={styles.analyzeButtonText}>Analyze Resume</Text>
            </LinearGradient>
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
  uploadContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  uploadBox: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E2E8F0',
  },
  uploadIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  questionnaireContainer: {
    paddingHorizontal: 24,
  },
  questionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  experienceScrollContent: {
    paddingRight: 24,
    gap: 12,
  },
  experienceButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  experienceButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 140,
  },
  experienceButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  analyzeButtonContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 32,
  },
  analyzeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  analyzeButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  removeButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
}); 