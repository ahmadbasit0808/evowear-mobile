import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./utils/UserContext";
import { CartProvider } from "./utils/CardContext";
export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </CartProvider>
    </UserProvider>
  );
}
