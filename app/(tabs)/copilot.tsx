import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { Mic, MessageSquare, Bot } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CoPilotScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.subtitleContainer}>
          <TouchableOpacity 
            style={[styles.micCircle, { backgroundColor: colors.primary }]}
            onPress={() => {
              // Handle mic button press
              console.log('Mic button pressed');
            }}
          >
            <Mic size={14} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your AI-powered interview assistant
          </Text>
        </View>
      </View>

      <View style={styles.feedContainer}>
        <View style={[styles.feedSection, { flex: 1 }]}>
          <View style={styles.interviewerHeader}>
            <MessageSquare size={16} color={colors.primary} />
            <Text style={[styles.interviewerTitle, { color: colors.text }]}>
              Interviewer Feed
            </Text>
          </View>
          
          <ScrollView 
            style={styles.feedScrollView}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.feedScrollContent}
          >
            <View style={[styles.feedContent, { backgroundColor: colors.background }]}>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  Tell me about yourself and your experience...
                </Text>
              </View>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  What are your greatest strengths?
                </Text>
              </View>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  Describe a challenging project you worked on...
                </Text>
              </View>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  How do you handle difficult situations at work?
                </Text>
              </View>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  Where do you see yourself in 5 years?
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={[styles.feedSection, { flex: 1.5 }]}>
          <View style={styles.interviewerHeader}>
            <Bot size={16} color={colors.primary} />
            <Text style={[styles.interviewerTitle, { color: colors.text }]}>
              Co-pilot Feed
            </Text>
          </View>
          
          <ScrollView 
            style={styles.feedScrollView}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.feedScrollContent}
          >
            <View style={[styles.feedContent, { backgroundColor: colors.background }]}>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  I have 5 years of experience in software development, specializing in full-stack development with a focus on React and Node.js. I've worked on various projects ranging from e-commerce platforms to real-time collaboration tools.
                </Text>
              </View>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  My greatest strengths include problem-solving and teamwork. I excel at breaking down complex problems into manageable tasks and collaborating effectively with cross-functional teams to deliver high-quality solutions.
                </Text>
              </View>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  One challenging project involved implementing a real-time collaboration feature for a document editing platform. We had to handle concurrent edits, resolve conflicts, and ensure data consistency across multiple users.
                </Text>
              </View>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  I handle difficult situations by first understanding the root cause, gathering all relevant information, and then developing a structured approach to address the issue. I believe in transparent communication and involving the right stakeholders early in the process.
                </Text>
              </View>
              <View style={styles.feedItem}>
                <View style={[styles.feedDot, { backgroundColor: colors.primary }]} />
                <Text style={[styles.feedText, { color: colors.text }]}>
                  In 5 years, I aim to grow into a technical leadership role where I can mentor junior developers, drive architectural decisions, and contribute to the strategic direction of our technology stack while continuing to write code and stay hands-on with development.
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  micCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  feedContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  feedSection: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  feedScrollView: {
    flex: 1,
  },
  feedScrollContent: {
    flexGrow: 1,
  },
  interviewerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  interviewerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  feedContent: {
    borderRadius: 12,
    padding: 12,
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  feedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  feedText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
}); 