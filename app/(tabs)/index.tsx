import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Plus, ArrowRight, Mic, Video, BookOpen } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { InterviewCard } from '@/components/home/InterviewCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { useAuth } from '@/hooks/useAuth';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();

  const handleTechnicalCardPress = () => {
    router.push('/technical-interview');
  };

  const handleNewInterviewPress = () => {
    router.push('/interview-selection');
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
          entering={FadeInDown.delay(100).duration(500)}
          style={styles.header}
        >
          <TouchableOpacity style={styles.profileButton}>
            <OptimizedImage 
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }} 
              style={styles.profileImage}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Hello, {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
            </Text>
            <Text style={[styles.title, { color: colors.text }]}>
              Ready to ace your interview?
            </Text>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.searchContainer}
        >
          <SearchBar placeholder="Search for interview types..." />
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Start New Interview
            </Text>
            <TouchableOpacity onPress={handleNewInterviewPress}>
              <Plus size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            <InterviewCard 
              title="Technical"
              description="JavaScript, React, Data Structures"
              icon={<BookOpen size={24} color="#FFFFFF" />}
              colors={['#915EFF', '#6941C6']}
              onPress={handleTechnicalCardPress}
            />
            <InterviewCard 
              title="Behavioral"
              description="Leadership, Teamwork, Problem Solving"
              icon={<Mic size={24} color="#FFFFFF" />}
              colors={['#FE7A36', '#E14D2A']}
              onPress={() => {}}
            />
            <InterviewCard 
              title="Mock Video"
              description="Realistic interview simulation"
              icon={<Video size={24} color="#FFFFFF" />}
              colors={['#1C82AD', '#3D5AF1']}
              onPress={() => {}}
            />
          </ScrollView>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Your Progress
            </Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                See All
              </Text>
              <ArrowRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressTitle, { color: colors.text }]}>
                Interview Skills
              </Text>
              <Text style={[styles.progressPercent, { color: colors.primary }]}>
                68%
              </Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: '68%', backgroundColor: colors.primary }
                  ]} 
                />
              </View>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>5</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>This Week</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>8</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Hours</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Recent Interviews
            </Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                See All
              </Text>
              <ArrowRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.recentCard, { backgroundColor: colors.card }]}>
            <View style={styles.recentCardContent}>
              <View style={[styles.iconContainer, { backgroundColor: '#E0DBFF' }]}>
                <BookOpen size={20} color="#915EFF" />
              </View>
              <View style={styles.recentInfo}>
                <Text style={[styles.recentTitle, { color: colors.text }]}>
                  React Frontend Developer
                </Text>
                <Text style={[styles.recentSubtitle, { color: colors.textSecondary }]}>
                  Technical • 25min • 3 days ago
                </Text>
              </View>
              <View style={[styles.scoreContainer, { backgroundColor: '#F0EEFF' }]}>
                <Text style={[styles.scoreText, { color: '#6941C6' }]}>87%</Text>
              </View>
            </View>
          </View>

          <View style={[styles.recentCard, { backgroundColor: colors.card }]}>
            <View style={styles.recentCardContent}>
              <View style={[styles.iconContainer, { backgroundColor: '#FFE4D9' }]}>
                <Mic size={20} color="#FE7A36" />
              </View>
              <View style={styles.recentInfo}>
                <Text style={[styles.recentTitle, { color: colors.text }]}>
                  Leadership Experience
                </Text>
                <Text style={[styles.recentSubtitle, { color: colors.textSecondary }]}>
                  Behavioral • 18min • 5 days ago
                </Text>
              </View>
              <View style={[styles.scoreContainer, { backgroundColor: '#FFE4D9' }]}>
                <Text style={[styles.scoreText, { color: '#E14D2A' }]}>72%</Text>
              </View>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: 4,
  },
  cardsContainer: {
    paddingHorizontal: 16,
  },
  progressCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  progressPercent: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
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
  recentCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  recentCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  recentSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  scoreContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
});