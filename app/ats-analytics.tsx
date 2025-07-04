import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Award, BookOpen, Briefcase, FileText, GraduationCap, Layers, Medal, User as UserIcon } from 'lucide-react-native';
import { ProfileAvatar } from '@/components/ui/ProfileAvatar';
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function HalfDoughnutChart({ score, size = 200, strokeWidth = 20 }: { score: number; size?: number; strokeWidth?: number }) {
  const { colors } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(score / 100, {
      duration: 1200,
      easing: Easing.out(Easing.exp),
    });
  }, [score]);

  const animatedProps = useAnimatedProps(() => {
    const angle = progress.value * 180;
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians)),
      };
    };

    const start = polarToCartesian(size / 2, size / 2, radius, 0);
    const end = polarToCartesian(size / 2, size / 2, radius, angle);
    const largeArcFlag = angle <= 180 ? "0" : "1";

    const d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
    ].join(" ");

    return {
      d,
    };
  });

  const backgroundD = [
    "M", size / 2 - radius, size / 2,
    "A", radius, radius, 0, 0, 1, size / 2 + radius, size / 2
  ].join(" ");

  return (
    <View style={{ width: size, height: size / 2 + 10, alignItems: 'center', overflow: 'hidden' }}>
      <Svg width={size} height={size}>
        <G transform={`translate(0, ${size / 4})`}>
          <Path
            d={backgroundD}
            stroke={colors.primary + '33'}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          <AnimatedPath
            animatedProps={animatedProps}
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={{ position: 'absolute', bottom: -size/4, alignItems: 'center' }}>
        <Text style={[styles.atsScore, { color: colors.primary, fontSize: 40 }]}>
          {score}%
        </Text>
        <Text style={[styles.atsLabel, { color: colors.text, fontSize: 16, marginTop: -4 }]}>
          Your Resume Score
        </Text>
      </View>
    </View>
  );
}

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.sectionCard, { backgroundColor: colors.card }]}>  
      <View style={styles.sectionHeaderRow}>
        {icon}
        <Text style={[styles.sectionHeader, { color: colors.primary }]}>{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ListSection({ label, items }: { label: string; items?: any[] }) {
  if (!items || !items.length) return null;
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={styles.listLabel}>{label}</Text>
      <View style={styles.listItemWrap}>
        {items.map((item, idx) => (
          <View key={idx} style={styles.listBadge}>
            <Text style={styles.listBadgeText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function ATSAnalyticsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const parsedData = params.parsedData ? JSON.parse(params.parsedData as string) : {};
  const atsScore = 78; // Static ATS score

  // Extract user info for avatar
  const fullName = parsedData.fullName || '';
  const [firstName, ...rest] = fullName.split(' ');
  const lastName = rest.join(' ');

  const [howItWorksVisible, setHowItWorksVisible] = React.useState(false);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>  
      {/* Header with Back Button */}
      <View style={[styles.header, { paddingTop: insets.top + 16, backgroundColor: colors.background }]}>  
        <TouchableOpacity style={[styles.backButton, { backgroundColor: 'rgba(0,0,0,0.05)', marginRight: 16, borderRadius: 12 }]} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontFamily: 'Inter-Bold', fontSize: 24 }]}>Resume Analytics</Text>
      </View>

      {/* How it works Button */}
      <TouchableOpacity style={[styles.howItWorksButton, { backgroundColor: colors.primary }]} onPress={() => setHowItWorksVisible(true)}>
        <Text style={styles.howItWorksButtonText}>How it works</Text>
      </TouchableOpacity>

      {/* How it works Modal */}
      <Modal
        visible={howItWorksVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setHowItWorksVisible(false)}
      >
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end'}}>
          <View style={{backgroundColor: colors.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 32, paddingTop: 24, width: '100%', alignItems: 'center'}}>
            <View style={{width: 40, height: 4, backgroundColor: colors.text + '55', borderRadius: 2, marginBottom: 16}} />
            <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: colors.primary, fontFamily: 'Inter-Bold'}}>How Resume Analytics Works</Text>
            <Text style={{fontSize: 16, color: colors.text, marginBottom: 24, textAlign: 'center', fontFamily: 'Inter-Regular', lineHeight: 22}}>
              Your score is based on various recruiter checks.{"\n"}
              We'll show you how to fix each of these checks in your report.{"\n"}
              Fixing the issues we found will increase your resume score.
            </Text>
            <TouchableOpacity
              style={{backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24, marginTop: 8, width: '100%'}}
              onPress={() => setHowItWorksVisible(false)}
            >
              <Text style={{color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16, fontFamily: 'Inter-Bold'}}>
                Got It
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ATS Score Card */}
        <LinearGradient colors={[colors.card, colors.card]} style={[styles.atsCard, { backgroundColor: colors.card, shadowColor: colors.primary + '55' }]}>
          <HalfDoughnutChart score={atsScore} />
        </LinearGradient>

        {/* Basic Info Card */}
        <SectionCard icon={<UserIcon size={20} color={colors.primary} />} title="Basic Information">
          <View style={styles.avatarRow}>
            <ProfileAvatar size={64} firstName={firstName} lastName={lastName} />
            <View style={{ marginLeft: 16, flex: 1 }}>
              <InfoRow label="Full Name" value={parsedData.fullName} />
              <InfoRow label="Email" value={parsedData.emailAddress} />
              <InfoRow label="Phone" value={parsedData.phoneNumber} />
            </View>
          </View>
          <InfoRow label="LinkedIn" value={parsedData.linkedInProfile} />
          <InfoRow label="GitHub/Portfolio" value={parsedData.githubOrPortfolio} />
        </SectionCard>

        {/* Professional Summary */}
        <SectionCard icon={<FileText size={20} color={colors.primary} />} title="Professional Summary">
          <InfoRow label="Summary Statement" value={parsedData.summaryStatement} />
          <InfoRow label="Career Objective" value={parsedData.careerObjective} />
          <InfoRow label="Years of Experience" value={parsedData.yearsOfExperience} />
        </SectionCard>

        {/* Education */}
        <SectionCard icon={<GraduationCap size={20} color={colors.primary} />} title="Education">
          {parsedData.education && Array.isArray(parsedData.education) && parsedData.education.map((edu: any, idx: number) => (
            <View key={idx} style={[styles.eduCard, { backgroundColor: colors.card }]}>
              <InfoRow label="Degree" value={edu.degree} />
              <InfoRow label="Field of Study" value={edu.fieldOfStudy} />
              <InfoRow label="University" value={edu.university} />
              <InfoRow label="Location" value={edu.location} />
              <InfoRow label="Start Year" value={edu.startYear} />
              <InfoRow label="End Year" value={edu.endYear} />
              <InfoRow label="CGPA/Percentage" value={edu.cgpaOrPercentage} />
            </View>
          ))}
        </SectionCard>

        {/* Work Experience */}
        <SectionCard icon={<Briefcase size={20} color={colors.primary} />} title="Work Experience">
          {parsedData.workExperience && Array.isArray(parsedData.workExperience) && parsedData.workExperience.map((exp: any, idx: number) => (
            <View key={idx} style={[styles.expCard, { backgroundColor: colors.card }]}>
              <InfoRow label="Job Title" value={exp.jobTitle} />
              <InfoRow label="Company Name" value={exp.companyName} />
              <InfoRow label="Location" value={exp.location} />
              <InfoRow label="Start Date" value={exp.startDate} />
              <InfoRow label="End Date" value={exp.endDate} />
              <InfoRow label="Duration" value={exp.duration} />
              <ListSection label="Responsibilities" items={exp.responsibilities} />
              <ListSection label="Technologies Used" items={exp.technologiesUsed} />
            </View>
          ))}
        </SectionCard>

        {/* Skills */}
        <SectionCard icon={<Layers size={20} color={colors.primary} />} title="Skills">
          <ListSection label="Technical Skills" items={parsedData.technicalSkills} />
          <ListSection label="Soft Skills" items={parsedData.softSkills} />
          <ListSection label="Tools & Technologies" items={parsedData.toolsAndTechnologies} />
          <ListSection label="Languages" items={parsedData.languages} />
          <ListSection label="Skill Proficiency" items={parsedData.skillProficiency} />
        </SectionCard>

        {/* Certifications */}
        <SectionCard icon={<Award size={20} color={colors.primary} />} title="Certifications">
          {parsedData.certifications && Array.isArray(parsedData.certifications) && parsedData.certifications.map((cert: any, idx: number) => (
            <View key={idx} style={[styles.certCard, { backgroundColor: colors.card }]}>
              <InfoRow label="Certification Name" value={cert.name} />
              <InfoRow label="Issuing Organization" value={cert.organization} />
              <InfoRow label="Issue Date" value={cert.issueDate} />
              <InfoRow label="Expiration Date" value={cert.expirationDate} />
              <InfoRow label="Credential URL/ID" value={cert.credentialUrlOrId} />
            </View>
          ))}
        </SectionCard>

        {/* Projects */}
        <SectionCard icon={<BookOpen size={20} color={colors.primary} />} title="Projects">
          {parsedData.projects && Array.isArray(parsedData.projects) && parsedData.projects.map((proj: any, idx: number) => (
            <View key={idx} style={[styles.projectCard, { backgroundColor: colors.card }]}>
              <InfoRow label="Project Title" value={proj.title} />
              <InfoRow label="Short Description" value={proj.description} />
              <ListSection label="Technologies Used" items={proj.technologiesUsed} />
              <InfoRow label="Role/Responsibility" value={proj.role} />
              <InfoRow label="GitHub/Live Link" value={proj.link} />
            </View>
          ))}
        </SectionCard>

        {/* Awards & Achievements */}
        <SectionCard icon={<Medal size={20} color={colors.primary} />} title="Awards & Achievements">
          {parsedData.awards && Array.isArray(parsedData.awards) && parsedData.awards.map((award: any, idx: number) => (
            <View key={idx} style={[styles.awardCard, { backgroundColor: colors.card }]}>
              <InfoRow label="Award Title" value={award.title} />
              <InfoRow label="Issuing Organization" value={award.organization} />
              <InfoRow label="Date" value={award.date} />
              <InfoRow label="Description" value={award.description} />
            </View>
          ))}
        </SectionCard>

        {/* Publications / Research */}
        <SectionCard icon={<FileText size={20} color={colors.primary} />} title="Publications / Research">
          {parsedData.publications && Array.isArray(parsedData.publications) && parsedData.publications.map((pub: any, idx: number) => (
            <View key={idx} style={[styles.pubCard, { backgroundColor: colors.card }]}>
              <InfoRow label="Title" value={pub.title} />
              <InfoRow label="Conference/Journal" value={pub.journal} />
              <InfoRow label="Year" value={pub.year} />
              <InfoRow label="DOI/Link" value={pub.doiOrLink} />
            </View>
          ))}
        </SectionCard>

        {/* Volunteer Experience / Extracurriculars */}
        <SectionCard icon={<Briefcase size={20} color={colors.primary} />} title="Volunteer / Extracurriculars">
          {parsedData.volunteer && Array.isArray(parsedData.volunteer) && parsedData.volunteer.map((vol: any, idx: number) => (
            <View key={idx} style={[styles.volCard, { backgroundColor: colors.card }]}>
              <InfoRow label="Role" value={vol.role} />
              <InfoRow label="Organization" value={vol.organization} />
              <InfoRow label="Duration" value={vol.duration} />
              <InfoRow label="Description" value={vol.description} />
            </View>
          ))}
        </SectionCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    flex: 1,
    textAlign: 'left',
  },
  howItWorksButton: {
    margin: 16,
    alignSelf: 'flex-end',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  howItWorksButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  atsCard: {
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  atsLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  atsScore: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  },
  sectionCard: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    elevation: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
    gap: 8,
  },
  infoLabel: {
    fontWeight: '600',
    width: 120,
    fontFamily: 'Inter-Medium',
  },
  infoValue: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: 'Inter-Regular',
  },
  listLabel: {
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 2,
    fontFamily: 'Inter-Medium',
  },
  listItemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 2,
  },
  listBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 4,
  },
  listBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
  },
  eduCard: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  expCard: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  certCard: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  projectCard: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  awardCard: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  pubCard: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  volCard: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
}); 