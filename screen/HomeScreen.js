import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import Card from "../components/Card";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const host_url = "https://epur.unicjsc.com/";
  const data = [
    {
      code: "m_dashboard",
      name: "Dashboard",
      link: host_url + "m_dashboard",
    },
    {
      code: "m_ep00101",
      name: "Business Trip",
      link: host_url + "m_ep00101",
    },
    {
      code: "m_ep00102",
      name: "Advance",
      link: host_url + "m_ep00102",
    },
    {
      code: "m_ep00103",
      name: "Business Reimbursement",
      link: host_url + "m_ep00103",
    },
    {
      code: "m_ep00104",
      name: "General Reimbursement",
      link: host_url + "m_ep00104",
    },
    {
      code: "pmt00101",
      name: "PRQ",
      link: host_url + "pmt00101",
    },
  ];
  const fullname = {};
  let [responseData, setResponseData] = React.useState("");
  const axios = require("axios").default;
  const readinfo = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    let jsonObject = { user_login: "toanns", user_password: "qqq111!@#" };
    return jsonObject;
  };
  useEffect(() => {
    readinfo().then((jsonObject) => {
      axios({
        method: "POST",
        url: "https://epur.unicjsc.com/user_eprc/login",
        data: {
          user_login: jsonObject.user_login,
          user_password: jsonObject.user_password,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log(response.data);
          setResponseData(response.data);
        })
        .catch(function (error) {
          console.log("there is error", error);
        });
    });
  }, []);

  const renderItem = ({ item }) => {
    console.log("🚀 ~ renderItem ~ item:", item);
    return (
      <Card
        itemData={item}
        onPress={() =>
          navigation.navigate("CardItemDetails", { itemData: item })
        }
      ></Card>
    );
  };
  const theme = useTheme();
  // console.log("🚀 ~ HomeScreen ~ data:", data);
  // console.log("🚀 ~ renderItem ~ renderItem:", renderItem(data[0]));
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={require("../assets/homepageBG.png")}
        style={styles.topimage}
      >
        <Text style={styles.topName}>Hi, {responseData.fullname}!</Text>
        <Text style={styles.topPosition}>{responseData.department_name}</Text>
        <Text style={styles.topPosition}>{responseData.email}</Text>
      </ImageBackground>
      <Text style={styles.Header}>Categories</Text>
      <FlatList
        style={styles.itemRenderContainer}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemRenderContainer: {
    display: "flex",
    width: "100%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  topimage: {
    height: 220,
    width: "100%",
  },
  topName: {
    color: "white",
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 18,
    fontWeight: "bold",
  },
  oneLineInfo: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  topPosition: {
    color: "white",
    fontSize: 15,
    paddingLeft: 18,
    fontWeight: "600",
    paddingTop: 5,
  },
  Header: {
    color: "#434343",
    fontSize: 22,
    paddingLeft: 18,
    fontWeight: "bold",
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
});
