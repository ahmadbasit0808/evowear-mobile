import { useState } from "react";
import {
  Text, TextInput, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, useColorScheme, Pressable, View, Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "../../utils/UserContext";
import { bgThemeObj, inputThemeObj, textThemeObj, subTextThemeProp, COLORS } from "../../utils/themes";
import * as yup from "yup";
import { showMessage } from "react-native-flash-message";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

const defaultImage = require("../../images/guest.png");

export default function SignUpPage({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const { register } = useUser();

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, aspect: [1, 1], quality: 0.5,
    });
    if (!result.canceled && result.assets?.length > 0) setImageUri(result.assets[0].uri);
  };

  const onSubmit = (data) => {
    register({ ...data, image: imageUri, pay: 0, deliver: 0, ship: 0, review: 0, cancel: 0 });
    showMessage({ message: "Account Created!", description: `Welcome, ${data.name}!`, type: "success", icon: "success", duration: 2000 });
    reset();
    setImageUri(null);
    // isLoggedIn flips to true → Account navigator auto-shows UserPage
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={bgThemeObj(styles.container, colorScheme)}
    >
      <ScrollView keyboardDismissMode="on-drag" contentContainerStyle={styles.scroll}>
        <Text style={textThemeObj(styles.heading, colorScheme)}>Create Account</Text>
        <Text style={[styles.sub, { color: subTextThemeProp(colorScheme) }]}>Join Evowear today</Text>

        <Pressable style={styles.avatarContainer} onPress={pickImageAsync}>
          <Image source={imageUri ? { uri: imageUri } : defaultImage} style={styles.avatar} />
          <View style={styles.avatarBadge}>
            <Ionicons name="camera" size={14} color={COLORS.white} />
          </View>
        </Pressable>

        <Text style={[styles.label, { color: subTextThemeProp(colorScheme) }]}>Full Name</Text>
        <Controller
          control={control} name="name" defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={inputThemeObj(styles.input, colorScheme)}
              placeholder="John Doe"
              placeholderTextColor={subTextThemeProp(colorScheme)}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text style={[styles.label, { color: subTextThemeProp(colorScheme) }]}>Email</Text>
        <Controller
          control={control} name="email" defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={inputThemeObj(styles.input, colorScheme)}
              placeholder="you@example.com"
              placeholderTextColor={subTextThemeProp(colorScheme)}
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Text style={[styles.label, { color: subTextThemeProp(colorScheme) }]}>Password</Text>
        <Controller
          control={control} name="password" defaultValue=""
          render={({ field: { onChange, value } }) => (
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[inputThemeObj(styles.input, colorScheme), styles.passwordInput]}
                placeholder="••••••••"
                placeholderTextColor={subTextThemeProp(colorScheme)}
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
              />
              <Pressable style={styles.eyeBtn} onPress={() => setShowPassword((v) => !v)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={subTextThemeProp(colorScheme)} />
              </Pressable>
            </View>
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>CREATE ACCOUNT</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("login")}>
          <Text style={[styles.switchText, { color: subTextThemeProp(colorScheme) }]}>
            Already have an account? <Text style={styles.switchLink}>Log In</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, paddingTop: 24 },
  heading: { fontSize: 26, fontWeight: "800", textAlign: "center" },
  sub: { fontSize: 14, textAlign: "center", marginBottom: 20, marginTop: 4 },
  avatarContainer: { alignSelf: "center", marginBottom: 24, position: "relative" },
  avatar: { height: 90, width: 90, borderRadius: 45, borderWidth: 2, borderColor: COLORS.primary },
  avatarBadge: {
    position: "absolute", bottom: 0, right: 0,
    backgroundColor: COLORS.accent, borderRadius: 12,
    padding: 5, borderWidth: 2, borderColor: COLORS.white,
  },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, padding: 14, borderRadius: 12, fontSize: 15 },
  passwordWrapper: { position: "relative" },
  passwordInput: { paddingRight: 48 },
  eyeBtn: { position: "absolute", right: 14, top: 14 },
  error: { color: COLORS.danger, fontSize: 12, marginTop: 4 },
  button: {
    marginTop: 24, paddingVertical: 15,
    backgroundColor: COLORS.primary, borderRadius: 12, alignItems: "center",
  },
  btnText: { color: COLORS.white, fontWeight: "900", fontSize: 15, letterSpacing: 1 },
  switchText: { textAlign: "center", marginTop: 20, fontSize: 14 },
  switchLink: { color: COLORS.accent, fontWeight: "700" },
});
