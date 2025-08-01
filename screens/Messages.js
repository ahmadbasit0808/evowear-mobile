import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { bgThemeObj, textThemeObj, textThemeProp } from "../utils/themes";
export default function Message() {
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! How can i help you today?", fromMe: false },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    const userInput = inputText.trim();
    if (inputText.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      fromMe: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulated AI reply
    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        text: generateAIReply(userInput),
        fromMe: false,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000); // Simulate delay
  };

  const generateAIReply = (userInput) => {
    const input = userInput.toLowerCase();

    if (/hello|hi|hey/.test(input)) return "Hi there! Welcome to our store!";
    if (/how\s+are\s+you/.test(input))
      return "I'm just code, but always ready to help!";
    if (/help|assist|support/.test(input))
      return "Sure! What do you need help with?";
    if (/item|product|menu/.test(input))
      return "You can check out our latest products in the menu section.";
    if (/thank|thanks|thank you/.test(input))
      return "Happy to assist you today!";

    // 👕 Clothing-specific replies
    if (/shirt|t-shirt|tops/.test(input))
      return "We have a variety of shirts and tops. Check the men's or women's section for options.";
    if (/dress|gown|skirt/.test(input))
      return "You'll find our dresses in the women's section. Let me know if you're looking for anything specific!";
    if (/jeans|pants|trousers/.test(input))
      return "Our jeans and pants come in various styles and sizes. Visit the bottomwear section.";
    if (/size|fit|fitting/.test(input))
      return "We offer sizes from XS to XXL. You can check the size guide on each product page.";
    if (/color|colou?r/.test(input))
      return "Most of our items come in multiple colors. Choose your preferred one while browsing the product.";
    if (/price|cost/.test(input))
      return "Prices vary depending on the item. You can see the price right below each product image.";
    if (/discount|offer|sale|deal/.test(input))
      return "Yes! We have ongoing sales — check the 'Offers' section for great deals.";
    if (/return|refund/.test(input))
      return "We offer a 15-day return policy. You can initiate a return from your order history.";
    if (/delivery|shipping/.test(input))
      return "We offer free shipping on orders over $50. Delivery usually takes 3–5 business days.";
    if (/store|location|open|hours/.test(input))
      return "We’re open every day from 10 AM to 9 PM. Visit our store locator to find the nearest branch.";

    return "That's interesting! Let me know if you're looking for something specific.";
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.fromMe ? styles.fromMe : styles.fromOther,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={bgThemeObj(styles.container, colorScheme)}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 100}
    >
      <FlatList
        data={messages}
        keyboardDismissMode="none"
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={textThemeObj(styles.input, colorScheme)}
          placeholder="Type a message"
          placeholderTextColor={textThemeProp(colorScheme)}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  fromMe: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  fromOther: {
    backgroundColor: "#EAEAEA",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#269dd3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
