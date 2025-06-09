import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Code, Clock, BookOpen, Zap } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useState } from 'react';
import { TechnologySelectionModal } from '../components/interview/TechnologySelectionModal';

interface Technology {
  id: string;
  name: string;
  logo: any;
  category: string;
}

export default function TechnicalInterviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const [showTechModal, setShowTechModal] = useState(false);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

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
              style={styles.infoCard}
            >
              <View style={styles.infoHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#E0DBFF' }]}>
                  {typeof selectedTech.logo === 'string' ? (
                    <Text style={styles.techIcon}>{selectedTech.logo}</Text>
                  ) : (
                    <Image source={selectedTech.logo} style={styles.techLogo} />
                  )}
                </View>
                <View style={styles.infoContent}>
                  <Text style={[styles.infoTitle, { color: colors.text }]}>
                    {selectedTech.name}
                  </Text>
                  <Text style={[styles.infoSubtitle, { color: colors.textSecondary }]}>
                    {getTechnologyDescription(selectedTech)}
                  </Text>
                </View>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Clock size={20} color={colors.textSecondary} />
                  <Text style={[styles.statText, { color: colors.textSecondary }]}>30 min</Text>
                </View>
                <View style={styles.statItem}>
                  <BookOpen size={20} color={colors.textSecondary} />
                  <Text style={[styles.statText, { color: colors.textSecondary }]}>15 Questions</Text>
                </View>
                <View style={styles.statItem}>
                  <Zap size={20} color={colors.textSecondary} />
                  <Text style={[styles.statText, { color: colors.textSecondary }]}>Intermediate</Text>
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
              <View style={styles.topicsContainer}>
                {['Core Concepts', 'Best Practices', 'Problem Solving', 'System Design', 'Performance Optimization', 'Real-world Scenarios'].map((topic, index) => (
                  <View 
                    key={index}
                    style={[styles.topicChip, { backgroundColor: colors.card }]}
                  >
                    <Text style={[styles.topicText, { color: colors.text }]}>{topic}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(300).duration(500)}
              style={styles.section}
            >
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Interview Format
              </Text>
              <View style={[styles.formatCard, { backgroundColor: colors.card }]}>
                <View style={styles.formatItem}>
                  <Text style={[styles.formatNumber, { color: colors.primary }]}>1</Text>
                  <Text style={[styles.formatText, { color: colors.text }]}>
                    Coding Questions
                  </Text>
                </View>
                <View style={styles.formatItem}>
                  <Text style={[styles.formatNumber, { color: colors.primary }]}>2</Text>
                  <Text style={[styles.formatText, { color: colors.text }]}>
                    System Design
                  </Text>
                </View>
                <View style={styles.formatItem}>
                  <Text style={[styles.formatNumber, { color: colors.primary }]}>3</Text>
                  <Text style={[styles.formatText, { color: colors.text }]}>
                    Technical Discussion
                  </Text>
                </View>
              </View>
            </Animated.View>

            <TouchableOpacity 
              style={[styles.startButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push({
                pathname: '/ai-technical-interview',
                params: { technology: selectedTech.id }
              })}
            >
              <Text style={styles.startButtonText}>Start Interview</Text>
            </TouchableOpacity>
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
  initialView: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heroContainer: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  initialTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  initialSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
  featuresContainer: {
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    borderRadius: 16,
    padding: 16,
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
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.8,
  },
  infoCard: {
    backgroundColor: '#F8F9FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  techIcon: {
    fontSize: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  infoSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  topicText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  formatCard: {
    borderRadius: 16,
    padding: 16,
  },
  formatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  formatNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    width: 24,
  },
  formatText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  startButton: {
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  techLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
}); 