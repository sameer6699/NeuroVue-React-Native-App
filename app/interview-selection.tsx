import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Briefcase, Users, MessageSquare, Code, Database } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

export default function InterviewSelectionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();

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
          Select Interview Type
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.delay(100).duration(500)}
          style={styles.cardContainer}
        >
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => router.push('/technical-interview')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E0DBFF' }]}>
              <Briefcase size={24} color="#915EFF" />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Technical Interview
              </Text>
              <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                Practice coding questions, algorithms, and technical concepts
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => router.push('/hr-interview')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFE4D9' }]}>
              <Users size={24} color="#FE7A36" />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                HR Interview
              </Text>
              <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                Practice behavioral questions, salary negotiation, and company culture
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => router.push('/behavioral-interview')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
              <MessageSquare size={24} color="#22C55E" />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Behavioral Interview
              </Text>
              <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                Practice behavioral questions and improve your communication skills
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => {}}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E0F2FE' }]}>
              <Code size={24} color="#0EA5E9" />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                System Design
              </Text>
              <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                Practice designing scalable systems and architecture discussions
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => {}}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
              <Database size={24} color="#F59E0B" />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Database Design
              </Text>
              <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
                Practice database schema design, optimization, and query writing
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
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
  cardContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
}); 