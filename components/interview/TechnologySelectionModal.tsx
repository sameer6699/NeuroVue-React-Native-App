import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface Technology {
  id: string;
  name: string;
  logo: any;
  category: string;
}

interface TechnologySelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (technology: Technology) => void;
}

const technologies: Technology[] = [
  // Programming Languages
  { id: 'python', name: 'Python', logo: require('@/assets/images/logos/python-logo.png'), category: 'Programming Languages' },
  { id: 'java', name: 'Java', logo: require('@/assets/images/logos/java-logo.png'), category: 'Programming Languages' },
  { id: 'cpp', name: 'C++', logo: require('@/assets/images/logos/cpp-logo.png'), category: 'Programming Languages' },
  { id: 'javascript', name: 'JavaScript', logo: require('@/assets/images/logos/javascript-logo.png'), category: 'Programming Languages' },
  { id: 'typescript', name: 'TypeScript', logo: require('@/assets/images/logos/typescript-logo.png'), category: 'Programming Languages' },
  { id: 'golang', name: 'Go', logo: require('@/assets/images/logos/go-logo.png'), category: 'Programming Languages' },
  { id: 'rust', name: 'Rust', logo: require('@/assets/images/logos/rust-logo.png'), category: 'Programming Languages' },
  
  // Frontend Technologies
  { id: 'react', name: 'React', logo: require('@/assets/images/logos/react-logo.png'), category: 'Frontend Technologies' },
  { id: 'angular', name: 'Angular', logo: require('@/assets/images/logos/Angular-logo.png'), category: 'Frontend Technologies' },
  { id: 'vue', name: 'Vue.js', logo: require('@/assets/images/logos/Vuejs-logo.png'), category: 'Frontend Technologies' },
  { id: 'next', name: 'Next.js', logo: require('@/assets/images/logos/nextjs-logo.png'), category: 'Frontend Technologies' },
  { id: 'nuxt', name: 'Nuxt.js', logo: require('@/assets/images/logos/nuxtjs-logo.png'), category: 'Frontend Technologies' },
  { id: 'tailwind', name: 'Tailwind CSS', logo: require('@/assets/images/logos/tailwindcss-logo.png'), category: 'Frontend Technologies' },
  { id: 'bootstrap', name: 'Bootstrap', logo: require('@/assets/images/logos/bootstrap-logo.png'), category: 'Frontend Technologies' },
  { id: 'material-ui', name: 'Material-UI', logo: require('@/assets/images/logos/materialui-logo.png'), category: 'Frontend Technologies' },
  { id: 'redux', name: 'Redux', logo: require('@/assets/images/logos/redux-logo.png'), category: 'Frontend Technologies' },
  { id: 'webpack', name: 'Webpack', logo: require('@/assets/images/logos/webpack-logo.png'), category: 'Frontend Technologies' },
  { id: 'vite', name: 'Vite', logo: require('@/assets/images/logos/vite-logo.png'), category: 'Frontend Technologies' },
  { id: 'typescript', name: 'TypeScript', logo: require('@/assets/images/logos/typescript-logo.png'), category: 'Frontend Technologies' },
  { id: 'react-native', name: 'React Native', logo: require('@/assets/images/logos/react-native-logo.png'), category: 'Frontend Technologies' },
  { id: 'flutter', name: 'Flutter', logo: require('@/assets/images/logos/flutter-logo.png'), category: 'Frontend Technologies' },
  
  // Backend Technologies
  { id: 'spring', name: 'Spring Boot', logo: require('@/assets/images/logos/springboot-logo.png'), category: 'Backend Technologies' },
  { id: 'django', name: 'Django', logo: require('@/assets/images/logos/django-logo.png'), category: 'Backend Technologies' },
  { id: 'flask', name: 'Flask', logo: require('@/assets/images/logos/flask-logo.png'), category: 'Backend Technologies' },
  { id: 'express', name: 'Express.js', logo: require('@/assets/images/logos/express-js-logo.png'), category: 'Backend Technologies' },
  { id: 'nest', name: 'Nest.js', logo: require('@/assets/images/logos/neast-js-logo.png'), category: 'Backend Technologies' },
  { id: 'fastapi', name: 'FastAPI', logo: require('@/assets/images/logos/fast-api-logo.png'), category: 'Backend Technologies' },
  { id: 'laravel', name: 'Laravel', logo: require('@/assets/images/logos/laravel-logo.png'), category: 'Backend Technologies' },
  { id: 'rails', name: 'Ruby on Rails', logo: require('@/assets/images/logos/ruby-on-rails-logo.png'), category: 'Backend Technologies' },
  { id: 'aspnet', name: 'ASP.NET', logo: require('@/assets/images/logos/asp.net-logo.png'), category: 'Backend Technologies' },
  { id: 'prisma', name: 'Prisma', logo: require('@/assets/images/logos/prisma-logo.png'), category: 'Backend Technologies' },
  { id: 'redis', name: 'Redis', logo: require('@/assets/images/logos/redis-logo.png'), category: 'Backend Technologies' },
  { id: 'postman', name: 'Postman', logo: require('@/assets/images/logos/postman-logo.png'), category: 'Backend Technologies' },
  
  // Database Technologies
  { id: 'mysql', name: 'MySQL', logo: '🐬', category: 'Database Technologies' },
  { id: 'postgresql', name: 'PostgreSQL', logo: '🐘', category: 'Database Technologies' },
  { id: 'mongodb', name: 'MongoDB', logo: '🍃', category: 'Database Technologies' },
  { id: 'oracle', name: 'Oracle Database', logo: '🏢', category: 'Database Technologies' },
  { id: 'sqlserver', name: 'Microsoft SQL Server', logo: '💾', category: 'Database Technologies' },
  { id: 'sqlite', name: 'SQLite', logo: '📱', category: 'Database Technologies' },
  { id: 'mariadb', name: 'MariaDB', logo: '🌊', category: 'Database Technologies' },
  { id: 'cassandra', name: 'Apache Cassandra', logo: '📊', category: 'Database Technologies' },
  { id: 'dynamodb', name: 'Amazon DynamoDB', logo: '⚡', category: 'Database Technologies' },
  { id: 'firebase', name: 'Firebase Realtime DB', logo: '🔥', category: 'Database Technologies' },
  { id: 'cosmosdb', name: 'Azure Cosmos DB', logo: '🌌', category: 'Database Technologies' },
  { id: 'snowflake', name: 'Snowflake', logo: '❄️', category: 'Database Technologies' },
  { id: 'bigquery', name: 'Google BigQuery', logo: '🔎', category: 'Database Technologies' },
  { id: 'supabase', name: 'Supabase', logo: '🚀', category: 'Database Technologies' },
  
  // Cloud & DevOps
  { id: 'aws', name: 'AWS', logo: '☁️', category: 'Cloud & DevOps' },
  { id: 'docker', name: 'Docker', logo: '🐳', category: 'Cloud & DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', logo: '⚓', category: 'Cloud & DevOps' },
  { id: 'jenkins', name: 'Jenkins', logo: '🤖', category: 'Cloud & DevOps' },
  { id: 'terraform', name: 'Terraform', logo: '🏗️', category: 'Cloud & DevOps' },
  { id: 'ansible', name: 'Ansible', logo: '🤖', category: 'Cloud & DevOps' },
  { id: 'gitlab', name: 'GitLab CI/CD', logo: '🦊', category: 'Cloud & DevOps' },
  { id: 'github-actions', name: 'GitHub Actions', logo: '🐙', category: 'Cloud & DevOps' },
  { id: 'prometheus', name: 'Prometheus', logo: '📊', category: 'Cloud & DevOps' },
  { id: 'grafana', name: 'Grafana', logo: '📈', category: 'Cloud & DevOps' },
  
  // Computer Fundamentals
  { id: 'software-engineering', name: 'Software Engineering', logo: '💻', category: 'Computer Fundamentals' },
  { id: 'software-testing', name: 'Software Testing', logo: '🧪', category: 'Computer Fundamentals' },
  { id: 'operating-systems', name: 'Operating Systems', logo: '🖥️', category: 'Computer Fundamentals' },
  { id: 'software-development', name: 'Software Development', logo: '👨‍💻', category: 'Computer Fundamentals' },
  { id: 'data-structures', name: 'Data Structures', logo: '📊', category: 'Computer Fundamentals' },
  { id: 'algorithms', name: 'Algorithms', logo: '⚡', category: 'Computer Fundamentals' },
  { id: 'computer-networks', name: 'Computer Networks', logo: '🌐', category: 'Computer Fundamentals' },
  { id: 'database-management', name: 'Database Management', logo: '🗄️', category: 'Computer Fundamentals' },
  { id: 'system-design', name: 'System Design', logo: '🏗️', category: 'Computer Fundamentals' },
  { id: 'software-architecture', name: 'Software Architecture', logo: '🏛️', category: 'Computer Fundamentals' },
  { id: 'object-oriented', name: 'Object-Oriented Programming', logo: '🔄', category: 'Computer Fundamentals' },
  { id: 'design-patterns', name: 'Design Patterns', logo: '🎨', category: 'Computer Fundamentals' },
  { id: 'version-control', name: 'Version Control', logo: '📝', category: 'Computer Fundamentals' },
  { id: 'agile-methodology', name: 'Agile Methodology', logo: '🔄', category: 'Computer Fundamentals' },
  { id: 'software-security', name: 'Software Security', logo: '🔒', category: 'Computer Fundamentals' },
  { id: 'computer-architecture', name: 'Computer Architecture', logo: '🔧', category: 'Computer Fundamentals' },
  { id: 'compiler-design', name: 'Compiler Design', logo: '⚙️', category: 'Computer Fundamentals' },
  { id: 'operating-system-concepts', name: 'OS Concepts', logo: '💾', category: 'Computer Fundamentals' },
  { id: 'software-quality', name: 'Software Quality', logo: '✨', category: 'Computer Fundamentals' },
  { id: 'software-maintenance', name: 'Software Maintenance', logo: '🔧', category: 'Computer Fundamentals' },
];

export function TechnologySelectionModal({ visible, onClose, onSelect }: TechnologySelectionModalProps) {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('Programming Languages');

  const categories = Array.from(new Set(technologies.map(tech => tech.category)));

  const filteredTechnologies = technologies.filter(tech => tech.category === selectedCategory);

  const handleTechnologySelect = (tech: Technology) => {
    onSelect(tech);
  };

  const renderTechnology = (tech: Technology) => (
    <TouchableOpacity
      key={tech.id}
      style={[styles.techItem, { backgroundColor: colors.card }]}
      onPress={() => handleTechnologySelect(tech)}
    >
      {typeof tech.logo === 'string' ? (
        <Text style={styles.emojiLogo}>{tech.logo}</Text>
      ) : (
        <OptimizedImage
          source={tech.logo}
          style={styles.techLogo}
          contentFit="contain"
          cachePolicy="memory-disk"
        />
      )}
      <Text style={[styles.techName, { color: colors.text }]}>{tech.name}</Text>
    </TouchableOpacity>
  );

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
            {filteredTechnologies.map((tech) => renderTechnology(tech))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default TechnologySelectionModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: 500,
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
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  emojiLogo: {
    fontSize: 24,
    marginRight: 12,
  },
  techName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  techLogo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
}); 