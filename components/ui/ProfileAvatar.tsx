import { View, Text, StyleSheet } from 'react-native';
import { OptimizedImage } from './OptimizedImage';
import { useTheme } from '@/hooks/useTheme';

interface ProfileAvatarProps {
  size?: number;
  imageUri?: string | null;
  firstName?: string;
  lastName?: string;
}

export function ProfileAvatar({ size = 80, imageUri, firstName, lastName }: ProfileAvatarProps) {
  const { colors } = useTheme();
  
  if (imageUri) {
    return (
      <OptimizedImage 
        source={{ uri: imageUri }} 
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
    );
  }

  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();

  return (
    <View 
      style={[
        styles.initialsContainer, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          backgroundColor: colors.primary 
        }
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
        {initials || '?'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
}); 