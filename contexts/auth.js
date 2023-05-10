import React, { createContext, useContext, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, onChangeUser] = React.useState(null);
  const [name, onNameChangeText] = React.useState("");
  const [nameError, onNameErrorChangeText] = React.useState("");
  const [password, onPasswordChangeNumber] = React.useState("");
  const [passwordError, onPasswordErrorChangeNumber] = React.useState("");

  const navigation = useNavigation();

  const placeHolderName = useRef();
  const placeHolderPassword = useRef();

  function Oauth() {
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

    navigation.navigate("UserDetails");
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
        authenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
