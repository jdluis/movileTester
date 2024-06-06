import { Link } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function Profile() {
  return (
    <View>
      <Text>Profile Page</Text>
      <Link href="/chathidden">Chat</Link>
    </View>
  );
}
