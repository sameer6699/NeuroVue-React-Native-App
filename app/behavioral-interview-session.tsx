import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Mic, MicOff, Video, VideoOff, MessageCircle, Camera } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function BehavioralInterviewSessionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const pulseAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(
            withTiming(1.2, { duration: 1000 }),
            -1,
            true
          ),
        },
      ],
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>
            Behavioral Interview
          </Text>
        </View>
      </LinearGradient>

      {/* Video Section */}
      <View style={styles.videoSection}>
        <View style={styles.videoContainer}>
          <View style={styles.videoPlaceholder}>
            <Video size={32} color="#666" />
            <Text style={styles.videoPlaceholderText}>Camera Feed</Text>
          </View>
          
          {/* Video Controls Overlay */}
          <View style={styles.videoControls}>
            <View style={styles.videoControlsBottom}>
              <View style={styles.liveIndicatorContainer}>
                <View style={[styles.liveIndicator, { backgroundColor: '#FF4444' }]} />
                <Text style={styles.liveIndicatorText}>LIVE</Text>
              </View>
              <TouchableOpacity 
                style={[
                  styles.videoButton,
                  { backgroundColor: isVideoOn ? 'rgba(145, 94, 255, 0.8)' : '#FF4444' }
                ]}
                onPress={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video size={24} color="#FFFFFF" /> : <VideoOff size={24} color="#FFFFFF" />}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Interviewer Message */}
      <View style={[styles.interviewerMessageContainer, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
        <LinearGradient
          colors={['rgba(145, 94, 255, 0.15)', 'rgba(145, 94, 255, 0.05)']}
          style={styles.messageGradient}
        >
          <View style={styles.messageContent}>
            <MessageCircle size={24} color={colors.primary} style={styles.messageIcon} />
            <Text style={[styles.interviewerMessage, { color: colors.text }]}>
              Hello! I'm your AI Behavioral interviewer. Let's start with a question: Can you tell me about a time when you had to work with a difficult team member?
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.micButton, { 
            backgroundColor: isRecording ? '#FF4444' : colors.primary,
          }]}
          onPress={() => setIsRecording(!isRecording)}
        >
          {isRecording ? <MicOff size={20} color="#FFFFFF" /> : <Mic size={20} color="#FFFFFF" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 12,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  videoSection: {
    height: height * 0.65,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  videoPlaceholderText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  videoControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  videoControlsBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 12,
  },
  liveIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  liveIndicatorText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  videoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  interviewerMessageContainer: {
    margin: 16,
    marginTop: height * 0.05,
    borderRadius: 16,
    overflow: 'hidden',
  },
  messageGradient: {
    padding: 16,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  messageIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  interviewerMessage: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  micButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 