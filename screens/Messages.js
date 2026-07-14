import React, { useState, useRef } from "react";
import {
  View, Text, FlatList, TextInput, Pressable,
  StyleSheet, KeyboardAvoidingView, Platform, useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { bgThemeObj, textThemeProp, subTextThemeProp, COLORS } from "../utils/themes";

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const generateAIReply = (userInput) => {
  const input = userInput.toLowerCase();
  if (/hello|hi|hey/.test(input)) return "Hi there! Welcome to Evowear 👋";
  if (/how\s+are\s+you/.test(input)) return "I'm always ready to help you find the perfect outfit!";
  if (/help|assist|support/.test(input)) return "Sure! What do you need help with?";
  if (/item|product|menu/.test(input)) return "Check out our latest products in the Home tab.";
  if (/thank|thanks/.test(input)) return "Happy to help! 😊";
  if (/shirt|t-shirt|tops/.test(input)) return "We have a great range of shirts and tops. Check the Home tab!";
  if (/dress|gown|skirt/.test(input)) return "Our dresses are in the women's section. Let me know if you need help!";
  if (/jeans|pants|trousers/.test(input)) return "Our jeans and pants come in various styles. Visit the Home tab.";
  if (/size|fit/.test(input)) return "We offer sizes XS to XXL. Check the size guide on each product page.";
  if (/price|cost/.test(input)) return "Prices are shown below each product image.";
  if (/discount|offer|sale|deal/.test(input)) return "Yes! Check the Deals tab for 20% off on selected items 🏷️";
  if (/return|refund/.test(input)) return "We offer a 15-day return policy. Initiate from your order history.";
  if (/delivery|shipping/.test(input)) return "Free shipping on orders over Rs. 5000. Delivery in 3–5 business days.";
  return "That's a great question! Let me know if you need anything specific.";
};

export default function Message() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const listRef = useRef(null);

  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! How can I help you today?", fromMe: false, time: new Date() },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now().toString(), text: trimmed, fromMe: true, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        text: generateAIReply(trimmed),
        fromMe: false,
        time: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 900);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.bubbleWrapper, item.fromMe ? styles.wrapperMe : styles.wrapperOther]}>
      <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : (isDark ? styles.bubbleOtherDark : styles.bubbleOther)]}>
        <Text style={[styles.bubbleText, { color: item.fromMe ? COLORS.white : textThemeProp(colorScheme) }]}>
          {item.text}
        </Text>
        <Text style={[styles.timeText, { color: item.fromMe ? "rgba(255,255,255,0.7)" : subTextThemeProp(colorScheme) }]}>
          {formatTime(item.time)}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={bgThemeObj(styles.container, colorScheme)}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 100}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyboardDismissMode="on-drag"
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      />
      <View style={[styles.inputContainer, { borderTopColor: isDark ? COLORS.darkBorder : COLORS.lightBorder, backgroundColor: isDark ? COLORS.darkCard : COLORS.white }]}>
        <TextInput
          style={[styles.input, { backgroundColor: isDark ? COLORS.darkInput : "#f5f5f5", color: textThemeProp(colorScheme) }]}
          placeholder="Type a message..."
          placeholderTextColor={subTextThemeProp(colorScheme)}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          multiline
        />
        <Pressable
          style={[styles.sendButton, { backgroundColor: inputText.trim() ? COLORS.accent : "#ccc" }]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={18} color={COLORS.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  messageList: { padding: 16, paddingBottom: 8, flexGrow: 1, justifyContent: "flex-end" },
  bubbleWrapper: { marginVertical: 4 },
  wrapperMe: { alignItems: "flex-end" },
  wrapperOther: { alignItems: "flex-start" },
  bubble: { maxWidth: "78%", padding: 12, borderRadius: 18 },
  bubbleMe: { backgroundColor: COLORS.accent, borderBottomRightRadius: 4 },
  bubbleOther: { backgroundColor: "#f0f0f0", borderBottomLeftRadius: 4 },
  bubbleOtherDark: { backgroundColor: "#2a2a3e", borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 15, lineHeight: 21 },
  timeText: { fontSize: 10, marginTop: 4, alignSelf: "flex-end" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    alignItems: "flex-end",
    gap: 8,
  },
  input: {
    flex: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    width: 42, height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
});
