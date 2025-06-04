import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

type AuthFormProps = {
  type: 'signin' | 'signup';
  onSubmit: () => void;
};

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  const navigateToForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <View style={styles.container}>
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
          onChangeText={setEmail}
        />
      </View>

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
          onChangeText={setPassword}
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
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {type === 'signin' ? 'Sign In' : 'Sign Up'}
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
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});