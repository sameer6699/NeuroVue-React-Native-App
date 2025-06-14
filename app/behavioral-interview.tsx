import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MessageSquare, Users, Target, Clock, Award, Zap, Shield, Brain, Briefcase } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useRef, useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 280;
const CARD_SPACING = 16;

const practiceCategories = [
  {
    title: 'Teamwork & Collaboration',
    description: 'Practice questions about working in teams and handling group dynamics',
    icon: Users,
    color: '#E0F2FE',
    iconColor: '#0EA5E9'
  },
  {
    title: 'Leadership & Initiative',
    description: 'Questions about leading teams and taking initiative in projects',
    icon: Award,
    color: '#FEF3C7',
    iconColor: '#F59E0B'
  },
  {
    title: 'Problem Solving',
    description: 'Practice handling challenging situations and finding solutions',
    icon: Target,
    color: '#DCFCE7',
    iconColor: '#22C55E'
  },
  {
    title: 'Time Management',
    description: 'Questions about prioritizing tasks and meeting deadlines',
    icon: Clock,
    color: '#FEE2E2',
    iconColor: '#EF4444'
  },
  {
    title: 'Adaptability',
    description: 'Practice questions about handling change and new situations',
    icon: Zap,
    color: '#E0DBFF',
    iconColor: '#915EFF'
  },
  {
    title: 'Conflict Resolution',
    description: 'Questions about resolving conflicts and handling difficult situations',
    icon: Shield,
    color: '#FCE7F3',
    iconColor: '#EC4899'
  },
  {
    title: 'Decision Making',
    description: 'Practice making and explaining important decisions',
    icon: Brain,
    color: '#F3E8FF',
    iconColor: '#A855F7'
  },
  {
    title: 'Work Ethics',
    description: 'Questions about professional conduct and workplace values',
    icon: Briefcase,
    color: '#E0F2FE',
    iconColor: '#0EA5E9'
  }
];

export default function BehavioralInterviewScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = (currentIndex + 1) % practiceCategories.length;
        const offset = nextIndex * (CARD_WIDTH + CARD_SPACING);
        
        scrollViewRef.current.scrollTo({
          x: offset,
          animated: true
        });
        
        setCurrentIndex(nextIndex);
      }
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(scrollInterval);
  }, [currentIndex]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (CARD_WIDTH + CARD_SPACING));
    setCurrentIndex(index);
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
          Behavioral Interview
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Animated.View 
            entering={FadeInDown.delay(100).duration(500)}
            style={styles.infoContainer}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
              <MessageSquare size={32} color="#22C55E" />
            </View>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Behavioral Interview Practice
            </Text>
          </Animated.View>

          <View style={styles.practiceSection}>
            <Text style={[styles.practiceTitle, { color: colors.text }]}>
              Core Competencies Evaluated
            </Text>
            <ScrollView 
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsContainer}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              pagingEnabled
              snapToInterval={CARD_WIDTH + CARD_SPACING}
              decelerationRate="fast"
            >
              {practiceCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.practiceCard, { backgroundColor: colors.card }]}
                  onPress={() => {
                    // TODO: Implement category selection
                  }}
                >
                  <View style={[styles.practiceIconContainer, { backgroundColor: category.color }]}>
                    <category.icon size={24} color={category.iconColor} />
                  </View>
                  <Text style={[styles.practiceCardTitle, { color: colors.text }]}>
                    {category.title}
                  </Text>
                  <Text style={[styles.practiceCardDescription, { color: colors.textSecondary }]}>
                    {category.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.dotsContainer}>
              {practiceCategories.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: index === currentIndex ? colors.primary : colors.card,
                      borderColor: colors.primary,
                    }
                  ]}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.startButton, { backgroundColor: colors.primary }]}
            onPress={() => {
              router.push('/behavioral-interview-session');
            }}
          >
            <Text style={styles.startButtonText}>Start Interview</Text>
          </TouchableOpacity>
        </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  infoContainer: {
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  practiceSection: {
    marginVertical: 24,
    marginBottom: 40,
  },
  practiceTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
  cardsContainer: {
    paddingRight: 16,
    gap: 16,
    paddingBottom: 8,
  },
  practiceCard: {
    width: CARD_WIDTH,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8,
  },
  practiceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  practiceCardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  practiceCardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  startButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
}); 