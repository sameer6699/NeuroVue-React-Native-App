import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

interface ExperienceSelectorProps {
  onExperienceSelect: (level: string) => void;
  onResumeUpload: (uri: string) => void;
}

const experienceLevels = ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead', 'Architect'];

export const ExperienceSelector: React.FC<ExperienceSelectorProps> = ({
  onExperienceSelect,
  onResumeUpload,
}) => {
  const { colors } = useTheme();
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [resumeName, setResumeName] = useState<string>('');

  const handleExperienceSelect = (level: string) => {
    setSelectedLevel(level);
    onExperienceSelect(level);
  };

  const handleResumeUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      });

      if (!result.canceled) {
        setResumeName(result.assets[0].name);
        onResumeUpload(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Experience Level</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.experienceScrollContainer}
        contentContainerStyle={styles.experienceScrollContent}
      >
        {experienceLevels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.experienceChip,
              {
                backgroundColor: selectedLevel === level ? colors.primary : colors.card,
                marginRight: 12,
              }
            ]}
            onPress={() => handleExperienceSelect(level)}
          >
            <Text style={[
              styles.experienceText,
              { color: selectedLevel === level ? 'white' : colors.text }
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.uploadContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Resume Upload</Text>
        <TouchableOpacity
          style={[styles.uploadButton, { borderColor: colors.border }]}
          onPress={handleResumeUpload}
        >
          <MaterialIcons name="upload-file" size={24} color={colors.primary} />
          <Text style={[styles.uploadText, { color: colors.primary }]}>
            {resumeName || 'Upload Resume (PDF/DOC)'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  experienceScrollContainer: {
    marginBottom: 16,
  },
  experienceScrollContent: {
    paddingRight: 16,
  },
  experienceChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  experienceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  uploadContainer: {
    marginTop: 8,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  uploadText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
  },
}); 