import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import { UserProvider } from "./utils/UserContext";
import { CartProvider } from "./utils/CartContext";
import AppNavigator from "./navigators/AppNavigator";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <SafeAreaProvider>
          <AppNavigator />
          <FlashMessage position="top" />
        </SafeAreaProvider>
      </CartProvider>
    </UserProvider>
  );
}
