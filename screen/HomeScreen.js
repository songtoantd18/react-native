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

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [responseData, setResponseData] = useState({});
  const { colors } = useTheme();
  const axios = require("axios").default;

  useEffect(() => {
    const readInfo = async () => {
      const jsonValue = {
        user_login: "toanns",
        user_password: "qqq111!@#",
      };
      return jsonValue;
    };

    readInfo().then((jsonObject) => {
      let url_request =
        "http://epur.unicjsc.com/menu_eprc/mobile/getmenudefault?username=" +
        jsonObject.user_login +
        "&password=" +
        jsonObject.user_password;
      axios.get(url_request).then(({ data }) => {
        // console.log(data);
        setData(data);
      });
      axios({
        method: "POST",
        url: "https://epur.unicjsc.com/user_eprc/login",
        data: {
          user_login: "toanns",
          user_password: "qqq111!@#",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          console.log("🚀 ~ response:", response);
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
          navigation.navigate("CardItemDetils", { itemData: item })
        }
      ></Card>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={require("../assets/homepageBG.png")}
        style={styles.topimage}
      >
        <Text style={[styles.topName, { color: colors.text }]}>
          Hi, {responseData.fullname}!
        </Text>
        <Text style={[styles.topPosition, { color: colors.text }]}>
          {responseData.department_name}
        </Text>
        <Text style={[styles.topPosition, { color: colors.text }]}>
          {responseData.email}
        </Text>
      </ImageBackground>
      <Text style={[styles.Header, { color: colors.text }]}>Categories</Text>
      <FlatList
        style={styles.itemRenderContainer}
        data={data.data}
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
    marginTop: 25,
    marginBottom: 10,
  },
  topimage: {
    height: 220,
    width: "100%",
  },
  topName: {
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 18,
    fontWeight: "bold",
  },
  topPosition: {
    fontSize: 15,
    paddingLeft: 18,
    fontWeight: "600",
    paddingTop: 5,
  },
  Header: {
    fontSize: 22,
    paddingLeft: 18,
    fontWeight: "bold",
  },
});
