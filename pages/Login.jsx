import React, { useState, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { AuthContext } from "../contexts/auth";

export default function Login({ navigation }) {
  const {
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
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>{String(user?.username)}</Text>
      <Text style={{ color: "#fff", marginBottom: 50, fontSize: 22 }}>
        FIAP Tech
      </Text>
      <SafeAreaView style={styles.safeAreaContainer}>
        <TextInput
          style={
            styles.loginInput && nameError == "Error1"
              ? styles.inputError
              : styles.input
          }
          onChangeText={onNameChangeText}
          placeholder={
            nameError == "Error1"
              ? placeHolderName.current.placeholder
              : "Insert your name here"
          }
          ref={placeHolderName}
          value={name}
        />
        <TextInput
          ref={placeHolderPassword}
          style={
            styles.loginInput && passwordError == "Error1"
              ? styles.inputError
              : styles.input
          }
          secureTextEntry={true}
          onChangeText={onPasswordChangeNumber}
          value={password}
          placeholder={
            passwordError == "Error1"
              ? placeHolderPassword.current.placeholder
              : "Insert your password here"
          }
          keyboardType="numeric"
        />

        <Button style={styles.loginAction} title="Sign in" onPress={Oauth} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    flexDirection: "column",
    alignItems: "center",
    minHeight: 100,
    justifyContent: "center",
    paddingBottom: 0,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  input: {
    fontSize: 16,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  inputError: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffd700",
  },
  safeAreaContainer: {
    backgroundColor: "#FF1493",
    borderRadius: 20,
    width: "100%",
    maxWidth: 480,
    padding: 20,
  },
  loginInput: {
    width: "100%",
  },
  loginAction: {
    marginTop: 20,
  },
});
