import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} initialRouteName="Login" />
      <Stack.Screen name="UserDetails" component={UserDetails} />
    </Stack.Navigator>
  );
}

export default Routes;
