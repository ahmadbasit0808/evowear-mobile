import { StyleSheet, useColorScheme, Dimensions } from "react-native";
import UserPage from "../components/Account/userPage";
import SignUpPage from "../components/Account/signUpPage";
import LoginPage from "../components/Account/loginPage";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

export default function Account() {
  const colorScheme = useColorScheme();
  return (
    <Drawer.Navigator
      initialRouteName="user"
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === "light" ? "#fff" : "#333",
        },
        headerTintColor: colorScheme === "light" ? "#000" : "#fff",
        drawerPosition: "right",
        drawerStyle: {
          width: width * (2 / 3),
          backgroundColor: colorScheme === "light" ? "#eee" : "#444",
        },
        drawerLabelStyle: {
          color: colorScheme === "light" ? "#000" : "#fff",
        },
      }}
    >
      <Drawer.Screen
        name="user"
        options={{ title: "My Account" }}
        component={UserPage}
      />
      <Drawer.Screen
        name="signup"
        options={{ title: "Sign Up" }}
        component={SignUpPage}
      />
      <Drawer.Screen
        name="login"
        options={{ title: "Log In" }}
        component={LoginPage}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
