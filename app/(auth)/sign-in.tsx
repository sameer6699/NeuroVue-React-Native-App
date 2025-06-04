import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { AuthForm } from '@/components/auth/AuthForm';

export default function SignIn() {
  const router = useRouter();
  const { colors } = useTheme();

  const handleSignIn = () => {
    router.replace('/(tabs)');
  };

  const navigateToSignUp = () => {
    router.replace('/sign-up');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            entering={FadeInDown.delay(100).duration(700)} 
            style={styles.logoContainer}
          >
            <Image
              source={require('@/assets/images/main-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.logoText, { color: '#1E293B' }]}>NeuroVue</Text>
            <Text style={[styles.tagline, { color: '#64748B' }]}>Your AI Interview Assistant</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(300).duration(700)}
            style={[styles.formContainer, { backgroundColor: '#FFFFFF' }]}
          >
            <Text style={[styles.title, { color: '#1E293B' }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: '#64748B' }]}>
              Sign in to continue your interview preparation
            </Text>
            
            <AuthForm 
              type="signin" 
              onSubmit={handleSignIn} 
            />

            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require('@/assets/images/google-logo.png')}
                  style={styles.socialLogo}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require('@/assets/images/linkedin-logo.png')}
                  style={styles.socialLogo}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: '#64748B' }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={navigateToSignUp}>
                <Text style={[styles.footerLink, { color: '#3D5AF1' }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  formContainer: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 20,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  separatorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginHorizontal: 12,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  socialLogo: {
    width: 20,
    height: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginRight: 4,
  },
  footerLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});