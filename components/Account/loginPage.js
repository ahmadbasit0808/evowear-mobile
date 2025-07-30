import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  useColorScheme,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bgThemeObj, textThemeObj, inputThemeObj } from "../../utils/themes";
import * as yup from "yup";

// ✅ Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function LoginPage({ navigation }) {
  const colorScheme = useColorScheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    Alert.alert(
      "User does not exist",
      "Create new account.\nGo to sign up Page.",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("signup");
            reset();
          }, // navigate on OK
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={bgThemeObj(styles.container, colorScheme)}
    >
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollView}
      >
        <Text style={textThemeObj(styles.heading, colorScheme)}>Log In</Text>

        {/* Email */}
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={inputThemeObj(styles.input, colorScheme)}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        {/* Password */}
        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={inputThemeObj(styles.input, colorScheme)}
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <View style={styles.button}>
          <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: 20,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    marginTop: 12,
  },
});
