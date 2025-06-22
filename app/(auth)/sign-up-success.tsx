import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle } from 'lucide-react-native';

export default function SignUpSuccess() {
  const router = useRouter();
  const { colors } = useTheme();

  const handleSignIn = () => {
    router.replace('/sign-in');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(500).delay(200)}>
            <CheckCircle size={80} color={colors.primary} />
        </Animated.View>

        <Animated.Text entering={FadeInUp.duration(500).delay(400)} style={[styles.title, { color: colors.text }]}>
            Account Created!
        </Animated.Text>

        <Animated.Text entering={FadeInUp.duration(500).delay(600)} style={[styles.message, { color: colors.text }]}>
            Your account has been created successfully. To start your interview preparation, you can now sign in.
        </Animated.Text>
        
        <Animated.View entering={FadeInDown.duration(500).delay(800)} style={styles.buttonContainer}>
            <TouchableOpacity 
                style={[styles.button, { backgroundColor: colors.primary }]} 
                onPress={handleSignIn}
                activeOpacity={0.8}
            >
                <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Sign In</Text>
            </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
    textAlign: 'center'
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
}); 