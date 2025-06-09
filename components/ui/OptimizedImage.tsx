import * as React from 'react';
import { Image as ExpoImage, ImageContentFit } from 'expo-image';
import { StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';

interface OptimizedImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
  transition?: number;
  cachePolicy?: 'none' | 'disk' | 'memory-disk' | 'memory';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  style,
  contentFit = 'cover',
  transition = 300,
  cachePolicy = 'memory-disk',
}) => {
  return (
    <ExpoImage
      source={source}
      style={style}
      contentFit={contentFit}
      transition={transition}
      cachePolicy={cachePolicy}
    />
  );
}; 