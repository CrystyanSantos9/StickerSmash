import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { StatusBar } from "expo-status-bar";


//context de auth
import { AuthContext } from "../contexts/auth";

export default function UserDetails() {
  //usando context - pega propriedade nome passada ao provider
  const { name } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://pbs.twimg.com/profile_images/614128989112782848/S8826jXM_400x400.jpg",
          }}
        />
        <Text style={styles.logoTitle}>Tech</Text>
        <Text style={styles.logoTitleCarteirinha}>
          Carteirinha de Estudante
        </Text>
      </View>
      <Image
        style={styles.avatar}
        source={{ uri: "https://github.com/CrystyanSantos9.png" }}
      />

<SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>CPF: 133.218.187-28</Text>
          <Text style={styles.info}>Curso: Engenharia da Computação </Text>
          <Text style={styles.info}>Matrícula: 201701009-6 </Text>
          <Text style={styles.info}>Período: 6 º</Text>
          <Text style={styles.info}>Validade: Jan/2024 </Text>
          <Text style={styles.info}>Conceito: 6.75 </Text>
        </ScrollView>
        <Text style={styles.textBottom}>© Fiap 2023  </Text>
        </SafeAreaView>
        </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FF1493",
    height: 200,
    alignContent: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 20,
  },
  logoTitle: {
    position: "relative",
    marginTop: 40,
    marginLeft: 20,
    fontSize: 22,
    color: "#F8F8FF",
    fontWeight: "600",
  },
  logoTitleCarteirinha: {
    position: "absolute",
    marginTop: 70,
    marginLeft: 120,
    fontSize: 16,
    color: "#F8F8FF",
    fontWeight: "600",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 100,
  },
  name: {
    alignSelf: "center",
    fontSize: 22,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    borderBottomWidth: 2,
    width: "100%",
    borderBottomColor: "white",
    fontSize: 16,
    color: "#696969",
    marginTop: 20,
    padding: 10,
  },
  textBottom: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#FF1493",
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
