import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import socket from "../../services/socket";

import moment from "moment";

moment.locale();

import { container } from "./style";

import { getCounts } from "../../services/api";

export default function Counts() {
  const [counts, setCounts] = useState([]);
  const [total, setTotal] = useState(0);
  const [refreshScreen, setRefreshScreen] = useState(false);

  socket.emit("join", "645c08e4d2973c4a00def49f");

  useEffect(() => {
    socket.on("newCountTotal", async (newTotal) => {
      await AsyncStorage.setItem("newCountTotal", JSON.stringify(newTotal));
      setTotal(newTotal);
      setRefreshScreen(true);
      console.log(newTotal);
    });

    // console.log(socket);
  }, [socket]);

  useEffect(() => {
    (async function () {
      try {
        const countsResponseAPI = await getCounts();
        if (countsResponseAPI.status === 200) {
          // console.log(countsResponseAPI.data);
          setCounts(countsResponseAPI.data);
          const lastCountTotal = await AsyncStorage.getItem("newCountTotal");
          setTotal(Number(lastCountTotal))

          setRefreshScreen(false);
          // const newTotal = await balance(counts);
          // setTotal(newTotal);
          // console.log(total);
        }
      } catch (e) {
        // error reading value
      }
    })();
  }, [refreshScreen]);

  // const balance = async (listOfCounts) => {
  //   const total = await listOfCounts
  //     .map((item) => Number(item.value))
  //     .reduce((balance, total) => {
  //       return balance + total;
  //     }, 0);

  //   return total;
  // };

  const dateFormat = (date) => moment(date).format("dddd MMM Do YY, h:mm:ss a");

  const Item = ({ category, date, description, user_id, value }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{category}</Text>
      <Text style={styles.title}>{dateFormat(date)}</Text>
      <Text style={styles.title}>{description}</Text>
      <Text style={styles.title}>{user_id}</Text>
      <Text style={styles.title}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={counts}
        renderItem={({ item }) => (
          <Item
            description={item.description}
            date={item.date}
            value={item.value}
            category={item.category}
            user_id={item.user_id}
          />
        )}
        keyExtractor={(item) => item._id}
      />
      <Text  style={styles.total}>Total: {total}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
  total: {
    backgroundColor: "#F8F8FF",
    fontSize: 32,
  },
});
