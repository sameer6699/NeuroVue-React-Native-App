import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { AuthForm } from '@/components/auth/AuthForm';

export default function SignUp() {
  const router = useRouter();
  const { colors } = useTheme();

  const handleSignUp = () => {
    router.replace('/(tabs)');
  };

  const navigateToSignIn = () => {
    router.replace('/sign-in');
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
            <Text style={[styles.title, { color: '#1E293B' }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: '#64748B' }]}>
              Sign up to start your interview preparation journey
            </Text>
            
            <AuthForm 
              type="signup" 
              onSubmit={handleSignUp} 
            />

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: '#64748B' }]}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={navigateToSignIn}>
                <Text style={[styles.footerLink, { color: '#3D5AF1' }]}>
                  Sign In
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
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
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  formContainer: {
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 24,
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
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
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