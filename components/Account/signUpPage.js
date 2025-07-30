import { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  Pressable,
  View,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
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
  const defaultImage = require("../../images/guest.png");
  const [imageUri, setImageUri] = useState(null);
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

  // ✅ Expo-compatible image picker
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "We need access to your photo gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const onSubmit = (data) => {
    const { name, email, password } = data;

    setUser((prevUser) => ({
      ...prevUser,
      name,
      email,
      password,
      image: imageUri || prevUser.image, // update image here!
    }));

    Alert.alert("Account Created Successfully", "Go to My Account.", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("user");
          reset();
          setImageUri(null);
        },
      },
    ]);
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

        <View style={styles.imageContainer}>
          <Image
            source={imageUri ? { uri: imageUri } : defaultImage}
            style={styles.image}
          />
          <Pressable onPress={pickImage}>
            <Text style={styles.imageText}>Choose profile picture</Text>
          </Pressable>
        </View>

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

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>SIGN UP</Text>
        </Pressable>
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
    paddingVertical: 10,
    backgroundColor: "#FFDE59",
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    alignSelf: "center",
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius: 100,
  },
  imageText: {
    marginTop: 10,
    fontSize: 12,
    color: "blue",
    alignSelf: "center",
    fontWeight: "600",
  },
});
