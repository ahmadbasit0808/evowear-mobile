import React, { useState } from "react";
import {
  View, KeyboardAvoidingView, Text, TextInput,
  StyleSheet, ScrollView, Platform, useColorScheme, Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { showMessage } from "react-native-flash-message";
import { useUser } from "../../utils/UserContext";
import { bgThemeObj, textThemeObj, inputThemeObj, subTextThemeProp, COLORS } from "../../utils/themes";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function LoginPage({ navigation }) {
  const colorScheme = useColorScheme();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();

  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ email, password }) => {
    const result = login(email, password);
    if (!result.success) {
      setError("password", { message: result.message });
      showMessage({ message: "Login Failed", description: result.message, type: "danger", icon: "danger", duration: 2500 });
    }
    // on success, isLoggedIn flips to true → Account navigator auto-shows UserPage
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={bgThemeObj(styles.container, colorScheme)}
    >
      <ScrollView keyboardDismissMode="on-drag" contentContainerStyle={styles.scroll}>
        <Ionicons name="person-circle-outline" size={72} color={COLORS.primary} style={styles.icon} />
        <Text style={textThemeObj(styles.heading, colorScheme)}>Welcome Back</Text>
        <Text style={[styles.sub, { color: subTextThemeProp(colorScheme) }]}>Sign in to your account</Text>

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
          <Text style={styles.btnText}>LOG IN</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("signup")}>
          <Text style={[styles.switchText, { color: subTextThemeProp(colorScheme) }]}>
            Don't have an account? <Text style={styles.switchLink}>Sign Up</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 24, paddingTop: 32 },
  icon: { alignSelf: "center", marginBottom: 8 },
  heading: { fontSize: 26, fontWeight: "800", textAlign: "center" },
  sub: { fontSize: 14, textAlign: "center", marginBottom: 28, marginTop: 4 },
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
