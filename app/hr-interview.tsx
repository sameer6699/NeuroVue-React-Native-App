import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Clock, MessageSquare, Zap, Briefcase } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

export default function HRInterviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState('');
  const [company, setCompany] = useState('');
  const [resumeAttached, setResumeAttached] = useState(false);

  const experienceLevels = [
    { label: 'Entry Level', value: 'entry', icon: '👨‍💼' },
    { label: 'Mid Level', value: 'mid', icon: '👨‍💻' },
    { label: 'Senior Level', value: 'senior', icon: '👨‍🔬' },
    { label: 'Lead', value: 'lead', icon: '👨‍💼' },
    { label: 'Principal', value: 'principal', icon: '👨‍🎓' },
    { label: 'Architect', value: 'architect', icon: '👨‍🔧' },
    { label: 'Executive', value: 'executive', icon: '👨‍💼' },
  ];

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
              Practice behavioral questions and improve your interview skills
            </Text>
          </View>

          <View style={[styles.featureCard, { backgroundColor: colors.card }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: '#E0F2FE' }]}>
              <Clock size={20} color="#0EA5E9" />
            </View>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                Real-time Feedback
              </Text>
              <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                Get instant feedback on your responses and communication
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
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Experience Level
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.experienceScrollContainer}
          >
            {experienceLevels.map((level) => (
              <TouchableOpacity
                key={level.value}
                style={[
                  styles.experienceButton,
                  { 
                    backgroundColor: selectedExperience === level.value ? colors.primary : colors.card,
                    borderColor: selectedExperience === level.value ? colors.primary : colors.border
                  }
                ]}
                onPress={() => setSelectedExperience(level.value)}
              >
                <Text style={styles.experienceIcon}>{level.icon}</Text>
                <Text 
                  style={[
                    styles.experienceText,
                    { color: selectedExperience === level.value ? '#FFFFFF' : colors.text }
                  ]}
                >
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.section}
        >
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Company Name</Text>
            <View style={[styles.inputWrapper, { backgroundColor: colors.card }]}>
              <Briefcase size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter company name"
                placeholderTextColor={colors.textSecondary}
                value={company}
                onChangeText={setCompany}
              />
            </View>
          </View>
        </Animated.View>

        <TouchableOpacity 
          style={[
            styles.startButton, 
            { 
              backgroundColor: colors.primary,
              opacity: (!selectedExperience || !company) ? 0.5 : 1
            }
          ]}
          disabled={!selectedExperience || !company}
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
    marginRight: 8,
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
  heroContainer: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  initialTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  initialSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  experienceScrollContainer: {
    paddingRight: 16,
  },
  experienceButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 120,
  },
  experienceIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  experienceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  startButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
}); 