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
  
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [company, setCompany] = useState('');
  const [resumeAttached, setResumeAttached] = useState(false);

  const experienceLevels = ['Fresher', 'Mid-Level', 'Experienced'];
  const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'Data Engineer'
  ];

  // Get the selected technology from the URL params
  const selectedTechnology = params.technology as string;

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
            <Text style={[styles.techName, { color: colors.text }]}>
              {selectedTechnology.charAt(0).toUpperCase() + selectedTechnology.slice(1)}
            </Text>
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
            Role & Experience
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Select Role</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
              <Picker
                selectedValue={selectedRole}
                onValueChange={(value) => setSelectedRole(value)}
                style={[styles.picker, { color: colors.text }]}
              >
                <Picker.Item label="Select a role" value="" />
                {roles.map((role) => (
                  <Picker.Item key={role} label={role} value={role} />
                ))}
              </Picker>
              <ChevronDown size={20} color={colors.textSecondary} style={styles.pickerIcon} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Experience Level</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
              <Picker
                selectedValue={selectedExperience}
                onValueChange={(value) => setSelectedExperience(value)}
                style={[styles.picker, { color: colors.text }]}
              >
                <Picker.Item label="Select experience level" value="" />
                {experienceLevels.map((level) => (
                  <Picker.Item key={level} label={level} value={level} />
                ))}
              </Picker>
              <ChevronDown size={20} color={colors.textSecondary} style={styles.pickerIcon} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Company (Optional)</Text>
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
              opacity: (!selectedRole || !selectedExperience) ? 0.5 : 1
            }
          ]}
          disabled={!selectedRole || !selectedExperience}
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
  },
  backButton: {
    marginRight: 16,
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
    fontSize: 18,
    marginBottom: 16,
  },
  uploadCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E0DBFF',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    height: 50,
  },
  pickerIcon: {
    position: 'absolute',
    right: 16,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    borderWidth: 1,
  },
  techCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  techName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  startButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
}); 