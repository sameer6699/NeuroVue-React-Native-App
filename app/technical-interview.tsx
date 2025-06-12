import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Modal, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Code, Clock, BookOpen, Zap, ChevronDown, Upload, FileText } from 'lucide-react-native';
import Animated, { 
  FadeInDown,
  useAnimatedScrollHandler,
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  interpolate,
  cancelAnimation
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { TechnologySelectionModal } from '../components/interview/TechnologySelectionModal';
import * as DocumentPicker from 'expo-document-picker';

interface Technology {
  id: string;
  name: string;
  logo: any;
  category: string;
}

interface ResumeFile {
  name: string;
  size: number;
  uri: string;
  mimeType: string;
}

const experienceLevels = ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Architect'];
const difficultyLevels = ['Easy', 'Intermediate', 'Advanced', 'Expert'];

export default function TechnicalInterviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const [showTechModal, setShowTechModal] = useState(false);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [selectedExperience, setSelectedExperience] = useState('Mid-Level');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [hasResume, setHasResume] = useState(false);
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const topics = ['Core Concepts', 'Best Practices', 'Problem Solving', 'Performance Optimization', 'Real-world Scenarios', 'Data Structures', 'Algorithms', 'Code Quality'];
  const screenWidth = Dimensions.get('window').width;
  const contentWidth = topics.length * 150; // Approximate width of all topics

  // Auto-scroll animation for topics
  useEffect(() => {
    if (selectedTech) {
      let currentPosition = 0;
      const scrollInterval = setInterval(() => {
        if (scrollViewRef.current) {
          currentPosition += 1;
          if (currentPosition >= contentWidth - screenWidth) {
            currentPosition = 0;
          }
          scrollViewRef.current.scrollTo({ x: currentPosition, animated: false });
        }
      }, 30);

      return () => {
        clearInterval(scrollInterval);
      };
    }
  }, [selectedTech]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleTechnologySelect = (technology: Technology) => {
    setSelectedTech(technology);
    setShowTechModal(false);
  };

  const getTechnologyDescription = (tech: Technology) => {
    switch (tech.category) {
      case 'Programming Languages':
        return `${tech.name} Programming`;
      case 'Web Technologies':
        return `${tech.name} Development`;
      case 'Backend Technologies':
        return `${tech.name} Backend Development`;
      case 'Database Technologies':
        return `${tech.name} Database`;
      case 'Cloud & DevOps':
        return `${tech.name} Cloud & DevOps`;
      default:
        return tech.name;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#22C55E';
      case 'Intermediate':
        return '#F59E0B';
      case 'Advanced':
        return '#EF4444';
      case 'Expert':
        return '#7C3AED';
      default:
        return colors.textSecondary;
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
      
      // Check file size (limit to 5MB)
      if (file.size && file.size > 5 * 1024 * 1024) {
        Alert.alert(
          'File Too Large',
          'Please select a file smaller than 5MB',
          [{ text: 'OK' }]
        );
        return;
      }

      setResumeFile({
        name: file.name,
        size: file.size || 0,
        uri: file.uri,
        mimeType: file.mimeType || '',
      });
      setHasResume(true);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to upload resume. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isFormComplete = () => {
    return (
      selectedTech !== null &&
      selectedExperience !== null &&
      selectedDifficulty !== null &&
      resumeFile !== null
    );
  };

  const getMissingRequirements = () => {
    const missing = [];
    if (!selectedTech) missing.push('Select a technology');
    if (!selectedExperience) missing.push('Choose experience level');
    if (!selectedDifficulty) missing.push('Select difficulty level');
    if (!resumeFile) missing.push('Upload your resume');
    return missing;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Technical Interview
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {!selectedTech ? (
          <Animated.View 
            entering={FadeInDown.delay(100).duration(500)}
            style={styles.initialView}
          >
            <View style={[styles.heroContainer, { backgroundColor: colors.card }]}>
              <View style={[styles.iconContainer, { backgroundColor: '#E0DBFF' }]}>
                <Code size={40} color="#915EFF" />
              </View>
              <Text style={[styles.initialTitle, { color: colors.text }]}>
                Ready to Start Your Technical Interview?
              </Text>
              <Text style={[styles.initialSubtitle, { color: colors.textSecondary }]}>
                Select your technology to begin the interview process
              </Text>
            </View>

            <View style={styles.featuresContainer}>
              <View style={[styles.featureCard, { backgroundColor: colors.card }]}>
                <View style={[styles.featureIconContainer, { backgroundColor: '#E0F2FE' }]}>
                  <Clock size={20} color="#0EA5E9" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Real-time Assessment
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                    Get instant feedback on your technical skills
                  </Text>
                </View>
              </View>

              <View style={[styles.featureCard, { backgroundColor: colors.card }]}>
                <View style={[styles.featureIconContainer, { backgroundColor: '#DCFCE7' }]}>
                  <Zap size={20} color="#22C55E" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    AI-Powered Analysis
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                    Get detailed insights and improvement suggestions
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.startButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowTechModal(true)}
            >
              <Text style={styles.startButtonText}>Select Technology</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <>
            <Animated.View 
              entering={FadeInDown.delay(100).duration(500)}
              style={[styles.infoCard, { backgroundColor: colors.card, elevation: 4, shadowColor: colors.text }]}
            >
              <View style={styles.infoHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#E0DBFF' }]}>
                  {typeof selectedTech.logo === 'string' ? (
                    <Text style={styles.techIcon}>{selectedTech.logo}</Text>
                  ) : (
                    <Image source={selectedTech.logo} style={styles.techLogo} />
                  )}
                </View>
                <View style={[styles.infoContent, { marginLeft: 16 }]}>
                  <Text style={[styles.infoTitle, { color: colors.text }]}>
                    {selectedTech.name}
                  </Text>
                  <Text style={[styles.infoSubtitle, { color: colors.textSecondary }]}>
                    {selectedTech.category}
                  </Text>
                </View>
              </View>
              <View style={[styles.statsContainer, { marginTop: 16 }]}>
                <View style={[styles.statItem, { marginTop: 12, marginHorizontal: 8 }]}>
                  <Clock size={18} color={colors.textSecondary} />
                  <Text style={[styles.statText, { color: colors.textSecondary, fontSize: 13 }]}>30 min</Text>
                </View>
                <View style={[styles.statItem, { marginTop: 12, marginHorizontal: 8 }]}>
                  <Zap size={18} color={colors.textSecondary} />
                  <Text style={[styles.statText, { color: getDifficultyColor(selectedDifficulty), fontSize: 13 }]}>
                    {selectedDifficulty}
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(200).duration(500)}
              style={styles.section}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Topics Covered
              </Text>
              <View style={styles.topicsScrollContainer}>
                <Animated.ScrollView
                  ref={scrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={false}
                  style={styles.topicsScrollView}
                  contentContainerStyle={styles.topicsScrollContent}
                  onScroll={scrollHandler}
                  scrollEventThrottle={16}
                >
                  {topics.map((topic, index) => (
                    <View 
                      key={index}
                      style={[styles.topicChip, { 
                        backgroundColor: colors.card,
                        marginRight: 12,
                        elevation: 2,
                        shadowColor: colors.text
                      }]}
                    >
                      <Text style={[styles.topicText, { color: colors.text }]}>{topic}</Text>
                    </View>
                  ))}
                </Animated.ScrollView>
              </View>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(250).duration(500)}
              style={styles.section}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Experience Level
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.experienceScrollContainer}
                contentContainerStyle={styles.experienceScrollContent}
              >
                {experienceLevels.map((level, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.experienceChip,
                      {
                        backgroundColor: selectedExperience === level ? colors.primary : colors.card,
                        marginRight: 12,
                      }
                    ]}
                    onPress={() => setSelectedExperience(level)}
                  >
                    <Text style={[
                      styles.experienceText,
                      { color: selectedExperience === level ? 'white' : colors.text }
                    ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(300).duration(500)}
              style={styles.section}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Interview Settings
              </Text>
              <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
                <TouchableOpacity 
                  style={styles.settingItem}
                  onPress={() => setShowDifficultyModal(true)}
                >
                  <View style={styles.settingLeft}>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>Difficulty Level</Text>
                    <Text style={[styles.settingValue, { color: getDifficultyColor(selectedDifficulty) }]}>
                      {selectedDifficulty}
                    </Text>
                  </View>
                  <ChevronDown size={20} color={colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.settingItem}
                  onPress={handleResumeUpload}
                >
                  <View style={styles.settingLeft}>
                    <Text style={[styles.settingLabel, { color: colors.text }]}>Resume Upload</Text>
                    {resumeFile ? (
                      <View style={styles.resumeInfo}>
                        <FileText size={16} color={colors.textSecondary} />
                        <Text style={[styles.settingValue, { color: '#22C55E', marginLeft: 8 }]}>
                          {resumeFile.name} ({formatFileSize(resumeFile.size)})
                        </Text>
                      </View>
                    ) : (
                      <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                        Not Uploaded
                      </Text>
                    )}
                  </View>
                  <Upload size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </Animated.View>

            <Modal
              visible={showDifficultyModal}
              transparent
              animationType="fade"
              onRequestClose={() => setShowDifficultyModal(false)}
            >
              <Pressable 
                style={styles.modalOverlay}
                onPress={() => setShowDifficultyModal(false)}
              >
                <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                  {difficultyLevels.map((level, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.difficultyOption,
                        {
                          borderBottomWidth: index === difficultyLevels.length - 1 ? 0 : 1,
                          borderBottomColor: colors.border
                        }
                      ]}
                      onPress={() => {
                        setSelectedDifficulty(level);
                        setShowDifficultyModal(false);
                      }}
                    >
                      <Text style={[styles.difficultyText, { color: colors.text }]}>{level}</Text>
                      {selectedDifficulty === level && (
                        <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </Pressable>
            </Modal>

            <Animated.View 
              entering={FadeInDown.delay(300).duration(500)}
              style={styles.section}
            >
              {isFormComplete() && (
                <TouchableOpacity 
                  style={[styles.startButton, { 
                    backgroundColor: colors.primary,
                    elevation: 4,
                    shadowColor: colors.text
                  }]}
                  onPress={() => router.push({
                    pathname: '/ai-technical-interview',
                    params: { 
                      technology: selectedTech?.id,
                      experience: selectedExperience,
                      difficulty: selectedDifficulty
                    }
                  })}
                >
                  <Text style={styles.startButtonText}>Start Interview</Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          </>
        )}
      </ScrollView>

      <TechnologySelectionModal
        visible={showTechModal}
        onClose={() => setShowTechModal(false)}
        onSelect={handleTechnologySelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  content: {
    padding: 16,
  },
  initialView: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heroContainer: {
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#915EFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  initialTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  initialSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 24,
  },
  featureCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 6,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  techLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  techIcon: {
    fontSize: 32,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statText: {
    marginLeft: 6,
    fontFamily: 'Inter-Medium',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 12,
  },
  topicsScrollContainer: {
    height: 50,
    marginTop: 8,
    overflow: 'hidden',
  },
  topicsScrollView: {
    flexGrow: 0,
  },
  topicsScrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  topicChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    minWidth: 120,
    alignItems: 'center',
  },
  topicText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  formatCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  formatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  formatNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  formatNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  formatText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  startButton: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  experienceScrollContainer: {
    marginTop: 8,
    height: 48,
    marginBottom: 4,
  },
  experienceScrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  experienceChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 36,
    justifyContent: 'center',
  },
  experienceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  settingsCard: {
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  settingLeft: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 2,
  },
  settingValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  difficultyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  difficultyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  resumeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tooltip: {
    position: 'absolute',
    bottom: '120%',
    left: 16,
    right: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tooltipText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  tooltipItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    marginBottom: 4,
    marginLeft: 8,
  },
}); 