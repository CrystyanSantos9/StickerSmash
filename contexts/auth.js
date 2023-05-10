import React, { createContext, useContext, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api, createSession } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [name, onNameChangeText] = React.useState("");
  const [nameError, onNameErrorChangeText] = React.useState("");
  const [password, onPasswordChangeNumber] = React.useState("");
  const [passwordError, onPasswordErrorChangeNumber] = React.useState("");
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const navigation = useNavigation();

  const placeHolderName = useRef();
  const placeHolderPassword = useRef();

  useEffect(() => {
    (async function () {
      try {
        const recoveredUser = await AsyncStorage.getItem("user");
        if (recoveredUser !== null) {
          setUser(JSON.parse(recoveredUser));
        }
        setLoading(true);
      } catch (e) {
        // error reading value
      }
    })();
  }, []);

  async function Oauth() {
    if (!name) {
      placeHolderName.current.placeholder = "Name cannot be null";
      onNameErrorChangeText("Error1");
      return;
    } else {
      onNameErrorChangeText("");
    }
    if (!password) {
      placeHolderPassword.current.placeholder = "Password cannot be null";
      onPasswordErrorChangeNumber("Error1");
      return;
    } else {
      onPasswordErrorChangeNumber("");
    }


    try {
      const response = await createSession(name, password);
      console.log(response.data);

      if (response.status === 200) {
        const loggedUserName = response.data.username;
        const token = response.data.token;

        await AsyncStorage.setItem("user", JSON.stringify(loggedUserName));
        await AsyncStorage.setItem("token", JSON.stringify(token));

        api.defaults.headers.token = `${token}`;

        setUser({ username: loggedUserName });
        // await AsyncStorage.setItem("user", JSON.stringify(name));
        await AsyncStorage.setItem(
          "lastaccess",
          JSON.stringify([{ user: loggedUserName, data: new Date().getDate() }])
        );
        setAuthenticated(true);
      }
    } catch (e) {
      console.log(e);
      setAuthenticated(false);
      return;
    }

    // navigation.navigate("UserDetails");
  }

  async function Logout() {
    console.log("logout");
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      api.defaults.headers.token = null;
      setUser(null);
      setAuthenticated(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        name,
        password,
        Oauth,
        nameError,
        passwordError,
        onNameErrorChangeText,
        onNameChangeText,
        onPasswordChangeNumber,
        onPasswordErrorChangeNumber,
        placeHolderName,
        placeHolderPassword,
        authenticated,
        user,
        Logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
