import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Users } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { ExperienceSelector } from '@/components/interview/ExperienceSelector';

export default function HRInterviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState('');
  const [company, setCompany] = useState('');
  const [resumeUri, setResumeUri] = useState('');

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
          HR Interview
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
          <View style={[styles.heroContainer, { backgroundColor: colors.card }]}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFE4D9' }]}>
              <Users size={40} color="#FE7A36" />
            </View>
            <Text style={[styles.initialTitle, { color: colors.text }]}>
              Ready for Your HR Interview?
            </Text>
            <Text style={[styles.initialSubtitle, { color: colors.textSecondary }]}>
              Practice HR questions and improve your HR interview skills
            </Text>
          </View>

          <ExperienceSelector
            onExperienceSelect={setSelectedExperience}
            onResumeUpload={setResumeUri}
          />

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Company Name</Text>
            <TextInput
              style={[styles.input, { 
                color: colors.text,
                borderColor: colors.border,
                backgroundColor: colors.background
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
              opacity: (!selectedExperience || !company || !resumeUri) ? 0.5 : 1
            }
          ]}
          disabled={!selectedExperience || !company || !resumeUri}
          onPress={() => router.push('/ai-hr-interview')}
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
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  section: {
    gap: 16,
  },
  heroContainer: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  initialTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  initialSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  startButton: {
    marginTop: 24,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 