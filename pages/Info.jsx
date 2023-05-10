import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUsers } from "../services/api";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";

import { AuthContext } from "../contexts/auth";

const Info = () => {
  const { user } = useContext(AuthContext);
  const [userRecovered, setUserRecovered] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const recoveredUser = await AsyncStorage.getItem("user");
        const lastLoginRecovered = await AsyncStorage.getItem("lastaccess");
        if (recoveredUser !== null) {
          setUserRecovered(JSON.parse(recoveredUser));
          setLastLogin(JSON.parse(lastLoginRecovered));
        }

        const userList = await getUsers();
        console.log(userList.data);
        
      } catch (e) {
        // error reading value
      }
    })();
  }, []);

  return (
    <View>
      <Text>Informações sobre o aluno {user?.username} </Text>
      <Text>Informações presentes no AsyncStorage {userRecovered} </Text>
      <Text>Último acesso {JSON.stringify(lastLogin)} </Text>
    </View>
  );
};

export default Info;
