import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

type InterviewTypeCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
  onPress: () => void;
};

export function InterviewTypeCard({ 
  title, 
  description, 
  icon, 
  backgroundColor,
  onPress 
}: InterviewTypeCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.arrowContainer}>
        <ArrowRight size={16} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});