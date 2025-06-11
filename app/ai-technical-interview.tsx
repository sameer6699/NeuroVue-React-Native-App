import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function AITechnicalInterviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [company, setCompany] = useState('');
  const [resumeAttached, setResumeAttached] = useState(false);

  const difficultyLevels = ['Easy', 'Medium', 'Advanced', 'Expert'];
  const experienceRanges = ['Fresher 1-5', '5-10 years', '10-15 years', '15+ years'];

  // Get the selected technology from the URL params
  const selectedTechnology = params.technology as string;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#4CAF50'; // Green
      case 'Medium':
        return '#FFC107'; // Yellow
      case 'Advanced':
        return '#2196F3'; // Blue
      case 'Expert':
        return '#F44336'; // Red
      default:
        return '#9E9E9E'; // Gray
    }
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
          AI Technical Interview
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(100).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Selected Technology
          </Text>
          <View style={[styles.techCard, { backgroundColor: colors.card }]}>
            <View style={styles.techHeader}>
              <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(selectedDifficulty) }]} />
              <Text style={[styles.techName, { color: colors.text }]}>
                {selectedTechnology.charAt(0).toUpperCase() + selectedTechnology.slice(1)}
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Resume Upload
          </Text>
          <TouchableOpacity 
            style={[styles.uploadCard, { backgroundColor: colors.card }]}
            onPress={() => setResumeAttached(true)}
          >
            <View style={styles.uploadContent}>
              <Upload size={24} color={colors.primary} />
              <Text style={[styles.uploadText, { color: colors.text }]}>
                {resumeAttached ? 'Resume Attached' : 'Upload Resume'}
              </Text>
              <Text style={[styles.uploadSubtext, { color: colors.textSecondary }]}>
                {resumeAttached ? 'Tap to change' : 'PDF, DOC, DOCX (Max 5MB)'}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Customize AI Model
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Difficulty Level</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
              <Picker
                selectedValue={selectedDifficulty}
                onValueChange={(value) => setSelectedDifficulty(value)}
                style={[styles.picker, { color: colors.text }]}
              >
                <Picker.Item label="Select difficulty level" value="" />
                {difficultyLevels.map((level) => (
                  <Picker.Item key={level} label={level} value={level} />
                ))}
              </Picker>
              <ChevronDown size={20} color={colors.textSecondary} style={styles.pickerIcon} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Experience Range</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
              <Picker
                selectedValue={selectedExperience}
                onValueChange={(value) => setSelectedExperience(value)}
                style={[styles.picker, { color: colors.text }]}
              >
                <Picker.Item label="Select experience range" value="" />
                {experienceRanges.map((range) => (
                  <Picker.Item key={range} label={range} value={range} />
                ))}
              </Picker>
              <ChevronDown size={20} color={colors.textSecondary} style={styles.pickerIcon} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Company Name</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.card,
                color: colors.text,
                borderColor: colors.border
              }]}
              placeholder="Enter company name"
              placeholderTextColor={colors.textSecondary}
              value={company}
              onChangeText={setCompany}
            />
          </View>
        </Animated.View>

        <TouchableOpacity 
          style={[
            styles.startButton, 
            { 
              backgroundColor: colors.primary,
              opacity: (!selectedDifficulty || !selectedExperience || !company) ? 0.5 : 1
            }
          ]}
          disabled={!selectedDifficulty || !selectedExperience || !company}
          onPress={() => {}}
        >
          <Text style={styles.startButtonText}>Start Interview</Text>
        </TouchableOpacity>
      </ScrollView>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
  uploadCard: {
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E0DBFF',
    backgroundColor: 'rgba(144, 94, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 6,
  },
  uploadSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    opacity: 0.8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    marginBottom: 10,
  },
  pickerContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  picker: {
    flex: 1,
    height: 56,
  },
  pickerIcon: {
    position: 'absolute',
    right: 16,
  },
  input: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  techCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  techHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#9E9E9E',
  },
  techName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  startButton: {
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  startButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
}); 