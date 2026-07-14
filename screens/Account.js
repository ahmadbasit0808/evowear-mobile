import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserPage from "../components/Account/userPage";
import SignUpPage from "../components/Account/signUpPage";
import LoginPage from "../components/Account/loginPage";
import { useUser } from "../utils/UserContext";
import { COLORS } from "../utils/themes";

const Stack = createNativeStackNavigator();

export default function Account() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useUser();
  const isDark = colorScheme === "dark";

  const screenOptions = {
    headerStyle: { backgroundColor: isDark ? COLORS.darkBg : COLORS.white },
    headerTintColor: isDark ? COLORS.darkText : COLORS.lightText,
    headerShadowVisible: false,
    contentStyle: { backgroundColor: isDark ? COLORS.darkBg : COLORS.white },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isLoggedIn ? (
        <Stack.Screen name="user" component={UserPage} options={{ title: "My Account" }} />
      ) : (
        <>
          <Stack.Screen name="login" component={LoginPage} options={{ title: "Log In" }} />
          <Stack.Screen name="signup" component={SignUpPage} options={{ title: "Sign Up" }} />
        </>
      )}
    </Stack.Navigator>
  );
}
