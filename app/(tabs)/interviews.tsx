import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookOpen, Mic, Video, Code, Lightbulb as LightbulbIcon, MessagesSquare, Filter, ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { InterviewTypeCard } from '@/components/interviews/InterviewTypeCard';

export default function InterviewsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(100).duration(500)}
          style={styles.header}
        >
          <Text style={[styles.title, { color: colors.text }]}>Interview Practice</Text>
          <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.card }]}>
            <Filter size={20} color={colors.primary} />
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Interview Types</Text>
          
          <View style={styles.cardGrid}>
            <InterviewTypeCard 
              title="Technical"
              description="Coding, system design & architecture"
              icon={<Code size={24} color="#FFFFFF" />}
              backgroundColor="#915EFF"
              onPress={() => {}}
            />
            
            <InterviewTypeCard 
              title="Behavioral"
              description="Leadership, teamwork & problem solving"
              icon={<LightbulbIcon size={24} color="#FFFFFF" />}
              backgroundColor="#FE7A36"
              onPress={() => {}}
            />
            
            <InterviewTypeCard 
              title="System Design"
              description="Architecture, scaling & infrastructure"
              icon={<BookOpen size={24} color="#FFFFFF" />}
              backgroundColor="#3D5AF1"
              onPress={() => {}}
            />
            
            <InterviewTypeCard 
              title="Mock Interview"
              description="Full interview simulation with feedback"
              icon={<Video size={24} color="#FFFFFF" />}
              backgroundColor="#22C55E"
              onPress={() => {}}
            />
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Interview Questions</Text>
          
          <View style={styles.questionList}>
            <TouchableOpacity style={[styles.questionItem, { backgroundColor: colors.card }]}>
              <View style={styles.questionContent}>
                <View style={[styles.questionCategory, { backgroundColor: '#E0DBFF' }]}>
                  <Text style={[styles.categoryText, { color: '#915EFF' }]}>Technical</Text>
                </View>
                <Text style={[styles.questionText, { color: colors.text }]}>
                  Explain how React's virtual DOM works and its benefits
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.questionItem, { backgroundColor: colors.card }]}>
              <View style={styles.questionContent}>
                <View style={[styles.questionCategory, { backgroundColor: '#FFE4D9' }]}>
                  <Text style={[styles.categoryText, { color: '#FE7A36' }]}>Behavioral</Text>
                </View>
                <Text style={[styles.questionText, { color: colors.text }]}>
                  Tell me about a time you had to deal with a difficult team member
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.questionItem, { backgroundColor: colors.card }]}>
              <View style={styles.questionContent}>
                <View style={[styles.questionCategory, { backgroundColor: '#DCFCE7' }]}>
                  <Text style={[styles.categoryText, { color: '#22C55E' }]}>System Design</Text>
                </View>
                <Text style={[styles.questionText, { color: colors.text }]}>
                  How would you design a distributed caching system?
                </Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Specialized Tracks</Text>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tracksContainer}
          >
            <TouchableOpacity style={[styles.trackCard, { backgroundColor: colors.card }]}>
              <View style={[styles.trackIconContainer, { backgroundColor: '#E0DBFF' }]}>
                <Code size={24} color="#915EFF" />
              </View>
              <Text style={[styles.trackTitle, { color: colors.text }]}>Frontend Development</Text>
              <Text style={[styles.trackDescription, { color: colors.textSecondary }]}>
                React, Vue, Angular, CSS
              </Text>
              <View style={[styles.trackStats, { borderTopColor: colors.border }]}>
                <Text style={[styles.trackStatText, { color: colors.textSecondary }]}>
                  16 questions
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.trackCard, { backgroundColor: colors.card }]}>
              <View style={[styles.trackIconContainer, { backgroundColor: '#DCFCE7' }]}>
                <BookOpen size={24} color="#22C55E" />
              </View>
              <Text style={[styles.trackTitle, { color: colors.text }]}>Data Science</Text>
              <Text style={[styles.trackDescription, { color: colors.textSecondary }]}>
                Python, ML, Statistics
              </Text>
              <View style={[styles.trackStats, { borderTopColor: colors.border }]}>
                <Text style={[styles.trackStatText, { color: colors.textSecondary }]}>
                  12 questions
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.trackCard, { backgroundColor: colors.card }]}>
              <View style={[styles.trackIconContainer, { backgroundColor: '#D1E9FF' }]}>
                <MessagesSquare size={24} color="#3D5AF1" />
              </View>
              <Text style={[styles.trackTitle, { color: colors.text }]}>Product Management</Text>
              <Text style={[styles.trackDescription, { color: colors.textSecondary }]}>
                Strategy, Roadmaps, Analytics
              </Text>
              <View style={[styles.trackStats, { borderTopColor: colors.border }]}>
                <Text style={[styles.trackStatText, { color: colors.textSecondary }]}>
                  14 questions
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  questionList: {
    paddingHorizontal: 24,
  },
  questionItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionContent: {
    flex: 1,
    marginRight: 12,
  },
  questionCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  questionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  tracksContainer: {
    paddingHorizontal: 16,
  },
  trackCard: {
    width: 200,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  trackIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  trackDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 16,
  },
  trackStats: {
    paddingTop: 12,
    borderTopWidth: 1,
  },
  trackStatText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});