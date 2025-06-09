import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

const { width } = Dimensions.get('window');

export default function GettingStarted() {
  const router = useRouter();

  const navigateToSignIn = () => {
    router.push('/sign-in');
  };

  const navigateToSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeInUp.delay(100).duration(700)} 
        style={styles.logoContainer}
      >
        <OptimizedImage
          source={require('@/assets/images/main-logo.png')}
          style={styles.logo}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
        <Text style={styles.logoText}>NeuroVue</Text>
        <Text style={styles.tagline}>Your AI Interview Assistant</Text>
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(300).duration(700)}
        style={styles.contentContainer}
      >
        <Text style={styles.title}>Welcome to NeuroVue</Text>

        <View style={styles.featuresContainer}>
          <Animated.View 
            entering={FadeInUp.delay(400).duration(700)}
            style={styles.featureItem}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🎯</Text>
            </View>
            <Text style={styles.featureText}>Personalized Practice</Text>
          </Animated.View>
          <Animated.View 
            entering={FadeInUp.delay(500).duration(700)}
            style={styles.featureItem}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🤖</Text>
            </View>
            <Text style={styles.featureText}>AI-Powered Feedback</Text>
          </Animated.View>
          <Animated.View 
            entering={FadeInUp.delay(600).duration(700)}
            style={styles.featureItem}
          >
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📈</Text>
            </View>
            <Text style={styles.featureText}>Track Progress</Text>
          </Animated.View>
        </View>
      </Animated.View>

      <Animated.View 
        entering={FadeInUp.delay(700).duration(700)}
        style={styles.buttonContainer}
      >
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={navigateToSignUp}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={navigateToSignIn}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E293B',
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 40,
  },
  featuresContainer: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 40,
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#3D5AF1',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  secondaryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#3D5AF1',
  },
}); 