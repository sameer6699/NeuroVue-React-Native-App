import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X } from 'lucide-react-native';
import { useState } from 'react';

interface Technology {
  id: string;
  name: string;
  icon: string;
  category: string;
}

interface TechnologySelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (technology: Technology) => void;
}

const technologies: Technology[] = [
  // Programming Languages
  { id: 'python', name: 'Python', icon: '🐍', category: 'Programming Languages' },
  { id: 'java', name: 'Java', icon: '☕', category: 'Programming Languages' },
  { id: 'cpp', name: 'C++', icon: '⚡', category: 'Programming Languages' },
  { id: 'javascript', name: 'JavaScript', icon: '📜', category: 'Programming Languages' },
  { id: 'typescript', name: 'TypeScript', icon: '📘', category: 'Programming Languages' },
  { id: 'golang', name: 'Go', icon: '🚀', category: 'Programming Languages' },
  { id: 'rust', name: 'Rust', icon: '🦀', category: 'Programming Languages' },
  
  // Web Technologies
  { id: 'react', name: 'React', icon: '⚛️', category: 'Web Technologies' },
  { id: 'angular', name: 'Angular', icon: '🅰️', category: 'Web Technologies' },
  { id: 'vue', name: 'Vue.js', icon: '🟢', category: 'Web Technologies' },
  { id: 'node', name: 'Node.js', icon: '🟩', category: 'Web Technologies' },
  
  // Backend Technologies
  { id: 'spring', name: 'Spring Boot', icon: '🌱', category: 'Backend Technologies' },
  { id: 'django', name: 'Django', icon: '🎸', category: 'Backend Technologies' },
  { id: 'flask', name: 'Flask', icon: '🍶', category: 'Backend Technologies' },
  { id: 'express', name: 'Express.js', icon: '🚂', category: 'Backend Technologies' },
  
  // Database Technologies
  { id: 'mysql', name: 'MySQL', icon: '🐬', category: 'Database Technologies' },
  { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', category: 'Database Technologies' },
  { id: 'mongodb', name: 'MongoDB', icon: '🍃', category: 'Database Technologies' },
  { id: 'redis', name: 'Redis', icon: '🔴', category: 'Database Technologies' },
  
  // Cloud & DevOps
  { id: 'aws', name: 'AWS', icon: '☁️', category: 'Cloud & DevOps' },
  { id: 'docker', name: 'Docker', icon: '🐳', category: 'Cloud & DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', icon: '⚓', category: 'Cloud & DevOps' },
  { id: 'jenkins', name: 'Jenkins', icon: '🤖', category: 'Cloud & DevOps' },
];

export function TechnologySelectionModal({ visible, onClose, onSelect }: TechnologySelectionModalProps) {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('Programming Languages');

  const categories = Array.from(new Set(technologies.map(tech => tech.category)));

  const filteredTechnologies = technologies.filter(tech => tech.category === selectedCategory);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Select Technology
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  { 
                    backgroundColor: selectedCategory === category ? colors.primary : colors.card,
                  }
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    { 
                      color: selectedCategory === category ? '#FFFFFF' : colors.text 
                    }
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView 
            style={styles.technologyList}
            showsVerticalScrollIndicator={false}
          >
            {filteredTechnologies.map((tech) => (
              <TouchableOpacity
                key={tech.id}
                style={[styles.technologyItem, { backgroundColor: colors.card }]}
                onPress={() => onSelect(tech)}
              >
                <Text style={styles.technologyIcon}>{tech.icon}</Text>
                <Text style={[styles.technologyName, { color: colors.text }]}>
                  {tech.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  closeButton: {
    padding: 4,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  technologyList: {
    maxHeight: 400,
  },
  technologyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  technologyIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  technologyName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
}); 