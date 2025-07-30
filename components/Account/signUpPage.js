import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "../../utils/UserContext";
import { bgThemeObj, textThemeObj, inputThemeObj } from "../../utils/themes";
import * as yup from "yup";

// ✅ Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function SignUpPage({ navigation }) {
  const colorScheme = useColorScheme();
  const { setUser } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { name, email, password } = data;
    setUser({
      name: name,
      email: email,
      password: password,
    });
    Alert.alert(
      "Account Created Successfully",
      "Go to My Account.",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("user");
            reset();
          },
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
        <Text style={textThemeObj(styles.heading, colorScheme)}>Sign Up</Text>

        {/* Full Name */}
        <Controller
          control={control}
          name="name"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={inputThemeObj(styles.input, colorScheme)}
              placeholder="Full Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

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
