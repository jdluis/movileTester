import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IntruderIndex() {
  return (
    <View style={styles.container}>
      <Text>Intruder Index Page</Text>
      <Link href="/gallery">Gallery</Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
