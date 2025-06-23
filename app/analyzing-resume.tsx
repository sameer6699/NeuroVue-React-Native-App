import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { getApiUrl, ENV } from '@/config/env';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut, useSharedValue, withTiming, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle2, XCircle, FileText } from 'lucide-react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

const loaderSteps = [
  'Please Wait',
  'Loading Your Resume',
  'Parsing Your Resume',
  'Identifying Core Section',
  'Identifying Other Section',
  'Identify Work Experience',
  'Evaluating Resume Length',
  'Identifying Bulletpoints',
  'Analyze Resume Depth',
  'Evaluating Impact',
  'Analyzing Writing Style',
  'Identifying Weak Verbs',
];

export default function AnalyzingResumeScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{
    jobTitle: string;
    companyName: string;
    industry: string;
    jobDescription: string;
    experienceLevel: string;
    resumeFileUri: string;
    resumeFileName: string;
    resumeFileMimeType: string;
  }>();

  const [status, setStatus] = useState<'analyzing' | 'success' | 'error'>('analyzing');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const stepOpacity = useSharedValue(1);
  const stepTranslateY = useSharedValue(30);

  useEffect(() => {
    const analyze = async () => {
      if (isAnalyzing) return;
      setIsAnalyzing(true);

      if (!params.resumeFileUri) {
        setErrorMessage('Resume file not found.');
        setStatus('error');
        return;
      }

      try {
        const base64 = await FileSystem.readAsStringAsync(params.resumeFileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const payload = {
          jobTitle: params.jobTitle,
          companyName: params.companyName,
          industry: params.industry,
          jobDescription: params.jobDescription,
          experienceLevel: params.experienceLevel,
          resumeBase64: base64,
          fileName: params.resumeFileName,
          fileType: params.resumeFileMimeType || '',
        };

        const response = await fetch(getApiUrl(ENV.API_ENDPOINTS.RESUME_ANALYZE), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus('success');
          setTimeout(() => {
            router.replace({
              pathname: '/ats-analytics',
              params: {
                parsedData: JSON.stringify(data.parsedData),
                atsScore: data.atsScore ? String(data.atsScore) : undefined,
              },
            });
          }, 1000);
        } else {
          setErrorMessage("Unfortunately, we couldn't process your resume. Upload resume in proper format");
          setStatus('error');
        }
      } catch (error) {
        setErrorMessage("Unfortunately, we couldn't process your resume. Upload resume in proper format");
        setStatus('error');
      }
    };

    analyze();
  }, [params]);

  useEffect(() => {
    if (status !== 'analyzing') return;
    let isMounted = true;
    const animateStep = (step: number) => {
      if (!isMounted) return;
      stepOpacity.value = 0;
      stepTranslateY.value = 30;
      stepOpacity.value = withTiming(1, { duration: 400 });
      stepTranslateY.value = withTiming(0, { duration: 400 });
      setTimeout(() => {
        stepOpacity.value = withTiming(0, { duration: 400 });
        stepTranslateY.value = withTiming(-30, { duration: 400 });
        setTimeout(() => {
          if (step < loaderSteps.length - 1) {
            runOnJS(setCurrentStep)(step + 1);
            animateStep(step + 1);
          }
        }, 400);
      }, 900);
    };
    animateStep(0);
    return () => { isMounted = false; };
  }, [status]);

  const animatedStepStyle = useAnimatedStyle(() => ({
    opacity: stepOpacity.value,
    transform: [{ translateY: stepTranslateY.value }],
  }));

  const renderContent = () => {
    switch (status) {
      case 'analyzing':
        return (
          <AnimatedView entering={ZoomIn} exiting={ZoomOut} style={styles.statusContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Animated.View style={[{ minHeight: 60, marginTop: 32 }, animatedStepStyle]}>
              <Text style={[styles.statusTitle, { color: colors.text, fontSize: 20 }]}> {loaderSteps[currentStep]} </Text>
            </Animated.View>
          </AnimatedView>
        );
      case 'success':
        return (
          <AnimatedView entering={ZoomIn} style={styles.statusContainer}>
            <CheckCircle2 size={64} color={colors.primary} />
            <Text style={[styles.statusTitle, { color: colors.text }]}>Analysis Complete!</Text>
            <Text style={[styles.statusSubtitle, { color: colors.textSecondary }]}>
              Your resume has been successfully analyzed.
            </Text>
          </AnimatedView>
        );
      case 'error':
        return (
          <AnimatedView entering={ZoomIn} style={styles.statusContainer}>
            <XCircle size={64} color={colors.error} />
            <Text style={[styles.statusTitle, { color: colors.text }]}>Analysis Failed</Text>
            <Text style={[styles.statusSubtitle, { color: colors.error }]}>
              {errorMessage}
            </Text>
          </AnimatedView>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <LinearGradient
        colors={[colors.primary + '30', colors.background]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '50%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  statusContainer: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    width: '100%',
  },
  statusTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  statusSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 24,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
}); 