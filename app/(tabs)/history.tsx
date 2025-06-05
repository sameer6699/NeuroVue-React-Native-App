import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, Filter, BookOpen, Mic, Video, Star, ChartBar as BarChart4, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { PerformanceChart } from '@/components/history/PerformanceChart';

export default function HistoryScreen() {
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
          <Text style={[styles.title, { color: colors.text }]}>Your Progress</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card }]}>
              <Calendar size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, marginLeft: 12 }]}>
              <Filter size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(200).duration(500)}
          style={[styles.statsCard, { backgroundColor: colors.card }]}
        >
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>26</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Interviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>12.5</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg. Score</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>68%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Improvement</Text>
            </View>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]} numberOfLines={1}>
              Performance Trend
            </Text>
            <TouchableOpacity style={[styles.periodButton, { backgroundColor: colors.card }]}>
              <Text style={[styles.periodText, { color: colors.textSecondary }]}>Last 30 Days</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.contributionGridContainer}
            >
              <View style={styles.contributionGrid}>
                {Array.from({ length: 30 }).map((_, index) => (
                  <View key={index} style={styles.contributionRow}>
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const intensity = Math.floor(Math.random() * 4);
                      return (
                        <View
                          key={dayIndex}
                          style={[
                            styles.contributionCell,
                            {
                              backgroundColor: intensity === 0 ? colors.border :
                                intensity === 1 ? '#9BE9A8' :
                                intensity === 2 ? '#40C463' :
                                '#30A14E'
                            }
                          ]}
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.contributionLegend}>
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>Less</Text>
              {[0, 1, 2, 3].map((intensity) => (
                <View
                  key={intensity}
                  style={[
                    styles.legendCell,
                    {
                      backgroundColor: intensity === 0 ? colors.border :
                        intensity === 1 ? '#9BE9A8' :
                        intensity === 2 ? '#40C463' :
                        '#30A14E'
                    }
                  ]}
                />
              ))}
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>More</Text>
            </View>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]} numberOfLines={1}>
              Interview History
            </Text>
          </View>
          
          <View style={styles.historyList}>
            <TouchableOpacity style={[styles.historyItem, { backgroundColor: colors.card }]}>
              <View style={[styles.historyIconContainer, { backgroundColor: '#E0DBFF' }]}>
                <BookOpen size={20} color="#915EFF" />
              </View>
              <View style={styles.historyContent}>
                <View style={styles.historyHeader}>
                  <Text style={[styles.historyTitle, { color: colors.text }]} numberOfLines={1}>
                    React Developer Interview
                  </Text>
                  <View style={[styles.scoreChip, { backgroundColor: '#DCFCE7' }]}>
                    <Text style={[styles.scoreText, { color: '#22C55E' }]}>85%</Text>
                  </View>
                </View>
                <View style={styles.historyDetails}>
                  <View style={styles.historyDetailItem}>
                    <Clock size={14} color={colors.textSecondary} />
                    <Text style={[styles.historySubtitle, { color: colors.textSecondary }]}>28 min</Text>
                  </View>
                  <View style={styles.historyDetailItem}>
                    <CalendarIcon size={14} color={colors.textSecondary} />
                    <Text style={[styles.historySubtitle, { color: colors.textSecondary }]}>June 15, 2025</Text>
                  </View>
                </View>
                <View style={styles.tagsContainer}>
                  <View style={[styles.tagChip, { backgroundColor: '#E0DBFF' }]}>
                    <Text style={[styles.tagText, { color: '#915EFF' }]}>React</Text>
                  </View>
                  <View style={[styles.tagChip, { backgroundColor: '#E0DBFF' }]}>
                    <Text style={[styles.tagText, { color: '#915EFF' }]}>JavaScript</Text>
                  </View>
                </View>
                <View style={styles.historyFooter}>
                  <Text style={[styles.historyType, { color: colors.textSecondary }]}>Technical</Text>
                  <ChevronRight size={16} color={colors.textSecondary} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.historyItem, { backgroundColor: colors.card }]}>
              <View style={[styles.historyIconContainer, { backgroundColor: '#FFE4D9' }]}>
                <Mic size={20} color="#FE7A36" />
              </View>
              <View style={styles.historyContent}>
                <View style={styles.historyHeader}>
                  <Text style={[styles.historyTitle, { color: colors.text }]} numberOfLines={1}>
                    Leadership Experience
                  </Text>
                  <View style={[styles.scoreChip, { backgroundColor: '#FFF4CC' }]}>
                    <Text style={[styles.scoreText, { color: '#EAB308' }]}>72%</Text>
                  </View>
                </View>
                <View style={styles.historyDetails}>
                  <View style={styles.historyDetailItem}>
                    <Clock size={14} color={colors.textSecondary} />
                    <Text style={[styles.historySubtitle, { color: colors.textSecondary }]}>22 min</Text>
                  </View>
                  <View style={styles.historyDetailItem}>
                    <CalendarIcon size={14} color={colors.textSecondary} />
                    <Text style={[styles.historySubtitle, { color: colors.textSecondary }]}>June 12, 2025</Text>
                  </View>
                </View>
                <View style={styles.tagsContainer}>
                  <View style={[styles.tagChip, { backgroundColor: '#FFE4D9' }]}>
                    <Text style={[styles.tagText, { color: '#FE7A36' }]}>Leadership</Text>
                  </View>
                  <View style={[styles.tagChip, { backgroundColor: '#FFE4D9' }]}>
                    <Text style={[styles.tagText, { color: '#FE7A36' }]}>Teamwork</Text>
                  </View>
                </View>
                <View style={styles.historyFooter}>
                  <Text style={[styles.historyType, { color: colors.textSecondary }]}>Behavioral</Text>
                  <ChevronRight size={16} color={colors.textSecondary} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.historyItem, { backgroundColor: colors.card }]}>
              <View style={[styles.historyIconContainer, { backgroundColor: '#D1E9FF' }]}>
                <Video size={20} color="#3D5AF1" />
              </View>
              <View style={styles.historyContent}>
                <View style={styles.historyHeader}>
                  <Text style={[styles.historyTitle, { color: colors.text }]} numberOfLines={1}>
                    Full Mock Interview
                  </Text>
                  <View style={[styles.scoreChip, { backgroundColor: '#FEE2E2' }]}>
                    <Text style={[styles.scoreText, { color: '#EF4444' }]}>68%</Text>
                  </View>
                </View>
                <View style={styles.historyDetails}>
                  <View style={styles.historyDetailItem}>
                    <Clock size={14} color={colors.textSecondary} />
                    <Text style={[styles.historySubtitle, { color: colors.textSecondary }]}>45 min</Text>
                  </View>
                  <View style={styles.historyDetailItem}>
                    <CalendarIcon size={14} color={colors.textSecondary} />
                    <Text style={[styles.historySubtitle, { color: colors.textSecondary }]}>June 8, 2025</Text>
                  </View>
                </View>
                <View style={styles.tagsContainer}>
                  <View style={[styles.tagChip, { backgroundColor: '#D1E9FF' }]}>
                    <Text style={[styles.tagText, { color: '#3D5AF1' }]}>Mixed</Text>
                  </View>
                  <View style={[styles.tagChip, { backgroundColor: '#D1E9FF' }]}>
                    <Text style={[styles.tagText, { color: '#3D5AF1' }]}>Full Interview</Text>
                  </View>
                </View>
                <View style={styles.historyFooter}>
                  <Text style={[styles.historyType, { color: colors.textSecondary }]}>Mock</Text>
                  <ChevronRight size={16} color={colors.textSecondary} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <Animated.View 
          entering={FadeInDown.delay(500).duration(500)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]} numberOfLines={1}>
              Key Skills
            </Text>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.skillsContainer}
          >
            <View style={[styles.skillCard, { backgroundColor: colors.card }]}>
              <View style={styles.skillHeader}>
                <View style={[styles.skillIconContainer, { backgroundColor: '#E0DBFF' }]}>
                  <Star size={20} color="#915EFF" />
                </View>
                <Text style={[styles.skillTitle, { color: colors.text }]}>Communication</Text>
              </View>
              <View style={styles.skillStatsContainer}>
                <View style={styles.skillStatRow}>
                  <Text style={[styles.skillStatLabel, { color: colors.textSecondary }]}>Proficiency</Text>
                  <Text style={[styles.skillStatValue, { color: colors.text }]}>85%</Text>
                </View>
                <View style={styles.skillProgress}>
                  <View style={[styles.skillProgressBg, { backgroundColor: colors.border }]} />
                  <View 
                    style={[
                      styles.skillProgressFill, 
                      { width: '85%', backgroundColor: '#915EFF' }
                    ]} 
                  />
                </View>
              </View>
            </View>
            
            <View style={[styles.skillCard, { backgroundColor: colors.card }]}>
              <View style={styles.skillHeader}>
                <View style={[styles.skillIconContainer, { backgroundColor: '#FFE4D9' }]}>
                  <BarChart4 size={20} color="#FE7A36" />
                </View>
                <Text style={[styles.skillTitle, { color: colors.text }]}>Problem Solving</Text>
              </View>
              <View style={styles.skillStatsContainer}>
                <View style={styles.skillStatRow}>
                  <Text style={[styles.skillStatLabel, { color: colors.textSecondary }]}>Proficiency</Text>
                  <Text style={[styles.skillStatValue, { color: colors.text }]}>72%</Text>
                </View>
                <View style={styles.skillProgress}>
                  <View style={[styles.skillProgressBg, { backgroundColor: colors.border }]} />
                  <View 
                    style={[
                      styles.skillProgressFill, 
                      { width: '72%', backgroundColor: '#FE7A36' }
                    ]} 
                  />
                </View>
              </View>
            </View>
            
            <View style={[styles.skillCard, { backgroundColor: colors.card }]}>
              <View style={styles.skillHeader}>
                <View style={[styles.skillIconContainer, { backgroundColor: '#DCFCE7' }]}>
                  <BookOpen size={20} color="#22C55E" />
                </View>
                <Text style={[styles.skillTitle, { color: colors.text }]}>Technical Knowledge</Text>
              </View>
              <View style={styles.skillStatsContainer}>
                <View style={styles.skillStatRow}>
                  <Text style={[styles.skillStatLabel, { color: colors.textSecondary }]}>Proficiency</Text>
                  <Text style={[styles.skillStatValue, { color: colors.text }]}>78%</Text>
                </View>
                <View style={styles.skillProgress}>
                  <View style={[styles.skillProgressBg, { backgroundColor: colors.border }]} />
                  <View 
                    style={[
                      styles.skillProgressFill, 
                      { width: '78%', backgroundColor: '#22C55E' }
                    ]} 
                  />
                </View>
              </View>
            </View>
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
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
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
    flex: 1,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  periodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  chartCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
  },
  contributionGridContainer: {
    paddingVertical: 8,
  },
  contributionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  contributionRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 2,
  },
  contributionCell: {
    width: 10,
    height: 10,
    borderRadius: 2,
    margin: 1,
  },
  contributionLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  legendCell: {
    width: 10,
    height: 10,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  historyList: {
    paddingHorizontal: 24,
  },
  historyItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  historyContent: {
    flex: 1,
    minWidth: 0,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  historyDetails: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  historyDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  historySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  historyType: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  scoreChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  scoreText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
  },
  skillsContainer: {
    paddingHorizontal: 16,
  },
  skillCard: {
    width: 200,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skillIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  skillTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  skillStatsContainer: {
    marginBottom: 8,
  },
  skillStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  skillStatValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  skillProgress: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  skillProgressBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  skillProgressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 3,
  },
});