import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Messages from "../screens/Messages";
import Cart from "../screens/Cart";
import Account from "../screens/Account";
import Deals from "../screens/Deal";
import { useColorScheme } from "react-native";
const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colorScheme === "light" ? "#fff" : "#333",
        },
        headerTintColor: colorScheme === "light" ? "#000" : "#fff",
        tabBarActiveTintColor: "#FFDE59",
        tabBarStyle: {
          backgroundColor: colorScheme === "light" ? "#fff" : "#333",
        },
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Message":
              iconName = focused ? "chatbox" : "chatbox-outline";
              break;
            case "Account":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Deals":
              iconName = focused ? "pricetag" : "pricetag-outline";
              break;
            case "Cart":
              iconName = focused ? "cart" : "cart-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Message" component={Messages} />
      <Tab.Screen name="Deals" component={Deals} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
