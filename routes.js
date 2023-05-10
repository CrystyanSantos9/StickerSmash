import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";

import { AuthContext } from "./contexts/auth";

import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import Info from "./pages/Info";

const Stack = createNativeStackNavigator();

// const PrivateRoutes = ({ children }) => {
//   const navigation = useNavigation();

//   const { authenticated } = useContext(AuthContext);

//   if (!authenticated) {
//     navigation.navigate("Login");
//   }

//   // Exibe as outras telas
//   return children;
// };

function Routes() {
  const { authenticated, loading } = useContext(AuthContext);

  if (!loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <Stack.Navigator>
      {!authenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            initialRouteName="Login"
          />
        </>
      ) : (
        <>
          <Stack.Screen name="UserDetails" component={UserDetails} />
          <Stack.Screen name="Info" component={Info} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Routes;
