import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function GetStarted() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={styles.gradient}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
          style={styles.content}
        >
          <Text style={styles.title}>Welcome to NeuroVue</Text>
          <Text style={styles.subtitle}>Your journey to better mental health starts here</Text>

          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 300 }}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              onPress={() => router.push('/(auth)/sign-in')}
              style={styles.button}
            >
              <LinearGradient
                colors={['#4A90E2', '#357ABD']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(auth)/sign-up')}
              style={[styles.button, styles.secondaryButton]}
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </MotiView>
        </MotiView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#b3b3b3',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    width: width - 40,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  secondaryButtonText: {
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 56,
  },
}); 