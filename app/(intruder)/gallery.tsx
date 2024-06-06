import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <Text>Gallery</Text>
      <Link href="/(intruder)">Intruder Notifications</Link>
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
