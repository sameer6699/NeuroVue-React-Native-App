import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Mail } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

export default function ForgotPassword() {
  const router = useRouter();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // TODO: Implement password reset logic
    console.log('Reset password for:', email);
  };

  const navigateToSignIn = () => {
    router.back();
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
            <Text style={[styles.title, { color: '#1E293B' }]}>Forgot Password</Text>
            <Text style={[styles.subtitle, { color: '#64748B' }]}>
              Enter your email address and we'll send you instructions to reset your password
            </Text>
            
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Mail size={20} color="#3D5AF1" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleResetPassword}
            >
              <Text style={styles.buttonText}>
                Send Reset Instructions
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: '#64748B' }]}>
                Remember your password?
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
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D5AF1',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
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