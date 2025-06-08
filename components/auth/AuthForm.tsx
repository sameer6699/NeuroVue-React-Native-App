import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

type AuthFormProps = {
  type: 'signin' | 'signup';
  onSubmit: () => void;
};

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; general?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      newErrors.general = 'Please fill in all required fields';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      newErrors.general = 'Please check your email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
      newErrors.general = 'Please fill in all required fields';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        if (type === 'signin') {
          await signIn(email.trim().toLowerCase(), password);
        } else {
          await signUp(name, email.trim().toLowerCase(), password);
        }
        onSubmit();
      } catch (error: any) {
        setErrors({
          general: error.message || 'Authentication failed. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const navigateToForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <View style={styles.container}>
      {errors.general && (
        <View style={styles.generalErrorContainer}>
          <AlertCircle size={16} color="#EF4444" />
          <Text style={styles.generalErrorText}>{errors.general}</Text>
        </View>
      )}

      {type === 'signup' && (
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <User size={20} color="#3D5AF1" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
          />
        </View>
      )}

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
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email || errors.general) {
              setErrors(prev => ({ ...prev, email: undefined, general: undefined }));
            }
          }}
        />
      </View>
      {errors.email && (
        <View style={styles.errorContainer}>
          <AlertCircle size={14} color="#EF4444" />
          <Text style={styles.errorText}>{errors.email}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Lock size={20} color="#3D5AF1" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password || errors.general) {
              setErrors(prev => ({ ...prev, password: undefined, general: undefined }));
            }
          }}
        />
        <TouchableOpacity 
          onPress={toggleShowPassword}
          style={styles.eyeIcon}
        >
          {showPassword ? (
            <EyeOff size={20} color="#94A3B8" />
          ) : (
            <Eye size={20} color="#94A3B8" />
          )}
        </TouchableOpacity>
      </View>
      {errors.password && (
        <View style={styles.errorContainer}>
          <AlertCircle size={14} color="#EF4444" />
          <Text style={styles.errorText}>{errors.password}</Text>
        </View>
      )}

      {type === 'signin' && (
        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={navigateToForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Signing in...' : type === 'signin' ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
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
  eyeIcon: {
    position: 'absolute',
    right: 12,
    height: 48,
    justifyContent: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3D5AF1',
  },
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D5AF1',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 4,
  },
  errorText: {
    color: '#EF4444',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
  generalErrorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  generalErrorText: {
    color: '#EF4444',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
});