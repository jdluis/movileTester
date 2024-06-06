import { Link } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { socket } from '@/socket/socket.js';
import { TextInput } from 'react-native-gesture-handler';

export default function ChathiddenIndex() {

  const [isLoged, setIsLoged] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const chatAreaRef = useRef<ScrollView>(null);

  useEffect(() => {
    setIsLoged(socket.id !== undefined);

    socket.on('receive_message', (message: string) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleConnection = () => {
    socket.connect();
    setIsLoged(true);
  }

  const handleDisconnect = () => {
    socket.disconnect();
    setIsLoged(false);
  }

  const handleSendMsg = () => {
    socket.emit('messageToServer', {payload: {message: msg}});
    setMsg("");
  }

  return (
    <View style={styles.container}>
      <Text>Chathidden Index Page</Text>
      <Link href="chathidden/profile">Profile</Link>

      <View>
        {!isLoged
          ? <Button title='Connect' onPress={handleConnection} />
          : <Button color={"#ff0000"} title='Disconnect' onPress={handleDisconnect} />
        }
      </View>

      <ScrollView 
        style={styles.textAreaContainer} 
        ref={chatAreaRef}
        onContentSizeChange={() => chatAreaRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <Text key={index} style={styles.textArea}>{message}</Text>
        ))}
      </ScrollView>

      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setMsg}
          value={msg}
        />
        <Button title='SendMsg' onPress={handleSendMsg} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textAreaContainer: {
    borderColor: "#2222",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
});
