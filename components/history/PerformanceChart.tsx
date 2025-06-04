import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

// This is a placeholder for a real chart component
// In a real app, you'd use a library like react-native-svg-charts,
// Victory Native, or react-native-chart-kit

export function PerformanceChart() {
  const { colors } = useTheme();
  
  // Sample data - in a real app, this would be dynamic
  const mockData = [
    { day: 'Mon', technical: 65, behavioral: 70, systemDesign: 60 },
    { day: 'Tue', technical: 70, behavioral: 75, systemDesign: 65 },
    { day: 'Wed', technical: 75, behavioral: 72, systemDesign: 70 },
    { day: 'Thu', technical: 72, behavioral: 78, systemDesign: 75 },
    { day: 'Fri', technical: 80, behavioral: 76, systemDesign: 78 },
    { day: 'Sat', technical: 82, behavioral: 80, systemDesign: 82 },
    { day: 'Sun', technical: 85, behavioral: 82, systemDesign: 85 }
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.chartPlaceholder}>
        <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
          Performance Chart
        </Text>
        
        {/* Chart bars placeholder */}
        <View style={styles.barsContainer}>
          {mockData.map((item, index) => (
            <View key={index} style={styles.barGroup}>
              <View style={styles.barLabels}>
                <Text style={[styles.barLabel, { color: colors.textSecondary }]}>
                  {item.day}
                </Text>
              </View>
              
              <View style={styles.bars}>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${item.technical}%`, 
                        backgroundColor: '#915EFF' 
                      }
                    ]} 
                  />
                </View>
                
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${item.behavioral}%`, 
                        backgroundColor: '#FE7A36' 
                      }
                    ]} 
                  />
                </View>
                
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${item.systemDesign}%`, 
                        backgroundColor: '#22C55E' 
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginBottom: 16,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    width: '100%',
    justifyContent: 'space-between',
  },
  barGroup: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  barLabels: {
    position: 'absolute',
    bottom: -20,
    width: '100%',
    alignItems: 'center',
  },
  barLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
  },
  bars: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'flex-end',
  },
  barContainer: {
    width: 4,
    height: '100%',
    marginHorizontal: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 2,
  },
});