import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';

type InterviewCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  colors: string[];
  onPress: () => void;
};

export function InterviewCard({ title, description, icon, colors, onPress }: InterviewCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={colors}
        style={styles.cardBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.arrow}>
          <ArrowRight size={20} color="#FFFFFF" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 140,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  arrow: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});