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
  const [data, setData] = useState([]);
  const fullname = {};
  let [responseData, setResponseData] = React.useState("");
  const axios = require("axios").default;
  const readinfo = async () => {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    let jsonObject = JSON.parse(jsonValue);
    return jsonObject;
  };
  useEffect(() => {
    readinfo().then((jsonObject) => {
      let url_request =
        "http://epur.unicjsc.com/menu_eprc/mobile/getmenudefault?username=" +
        jsonObject.user_login +
        "&password=" +
        jsonObject.user_password;
      axios.get(url_request).then(({ data }) => {
        console.log(data);
        setData(data);
      });
      axios({
        method: "POST",
        url: "http://epur.unicjsc.com/user_eprc/login",
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
          console.log(response.data.fullname);
          setResponseData(response.data);
        })
        .catch(function (error) {
          console.log("there is error", error);
        });
    });
  }, []);

  const renderItem = ({ item }) => {
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
  return (
    <ScrollView style={styles.container}>
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
        data={data.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
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
