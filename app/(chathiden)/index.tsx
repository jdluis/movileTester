import { Link } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { socket } from '@/socket/socket.js';

interface MessageObject {
  userId: string ;
  message: string;
}

export default function ChathiddenIndex() {

  const [isLoged, setIsLoged] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const chatAreaRef = useRef<ScrollView>(null);

  useEffect(() => {
    setIsLoged(socket.id !== undefined);

    socket.on('receive_message', (data) => {
      // Received user ID and message object.
      setMessages(prevMessages => [...prevMessages, data.payload]);
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
    // Add an identifier to the message, for example, the user ID.
    const messageWithUserId = { userId: 'tuUsuarioId', message: msg };
    socket.emit('messageToServer', messageWithUserId);
    setMsg("");
  }


  return (
    <View>
      <View style={styles.container}>
        <Text>Chathidden Index Page</Text>
        <Link href="chathidden/profile">Profile</Link>
      </View>
      <View>
        {!isLoged
          ? <Button title='Connect' onPress={handleConnection} />
          : <Button color={"#ff0000"} title='Disconnect' onPress={handleDisconnect} />
        }
      </View>
      <View>
        <ScrollView
          style={styles.textAreaContainer}
          ref={chatAreaRef}
          onContentSizeChange={() => chatAreaRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((messageData, index) => (
            <Text
              key={index}
              style={[
                styles.textArea,
                messageData.userId === 'tuUsuarioId' ? styles.myMessage : styles.otherMessage
              ]}
            >
              {messageData.message}
            </Text>
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
  },
  myMessage: {
    backgroundColor: 'lightgreen',
    alignSelf: 'flex-end',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  otherMessage: {
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
});
