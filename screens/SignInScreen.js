import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  Image,
  TouchableHighlight,
  AlertIOS,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { NavigationActions } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import TouchID from "react-native-touch-id";
import Home from "./HomeScreen";
// import * as keychain from 'react-native-keychain';
import ReactNativeBiometrics from "react-native-biometrics";
import MainTabScreen from "./MainTabScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "react-native-paper";

import { AuthContext } from "../components/context";

// import Users from '../model/users';

const SignInScreen = ({ navigation }) => {
  const axios = require("axios").default;
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (username, password) => {
    axios({
      method: "POST",
      url: "http://epur.unicjsc.com/user_eprc/login",
      data: {
        user_login: data.username.toLowerCase(),
        user_password: data.password,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.message == "Username or Password is incorrect") {
          // Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          //     {text: 'Okay'}
          // ]);
          const foundUser = data.username && data.password;
          signIn(foundUser);
          const datauser = {
            user_login: data.username.toLowerCase(),
            user_password: data.password,
          };
          // const jsonValue = JSON.stringify(response.data);
          AsyncStorage.setItem("@storage_Key", JSON.stringify(datauser));
          console.log(datauser);
        } else {
          const foundUser = data.username && data.password;
          signIn(foundUser);
          const datauser = {
            user_login: data.username.toLowerCase(),
            user_password: data.password,
          };
          // const jsonValue = JSON.stringify(response.data);
          AsyncStorage.setItem("@storage_Key", JSON.stringify(datauser));
          console.log(datauser);
        }
      })
      .catch(function (error) {
        console.log("there is error", error);
      });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg1.png")}
        style={styles.imageBG}
      >
        <StatusBar hidden />
        <View style={styles.header}>
          <Image
            source={require("../assets/login.png")}
            style={styles.loginImage}
          />
          <Text style={styles.text_header}>Login</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <Text style={[styles.text_footer]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long.
              </Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}

          <TouchableOpacity>
            <Text style={{ color: "#2F80ED", marginTop: 15 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            {/* loginHandle( data.username, data.password ) */}
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}
            >
              <LinearGradient
                colors={["#56CCF2", "#2F80ED"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign In
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#2F80ED',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#2F80ED'
                    }]}>Sign Up</Text>
                </TouchableOpacity> */}
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

export default SignInScreen;
function authenticate() {
  return TouchID.authenticate()
    .then((success) => {
      AlertIOS.alert("Authenticated Successfully");
    })
    .catch((error) => {
      console.log(error);
      AlertIOS.alert(error.message);
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498DB",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  loginImage: {
    height: "65%",
    width: "40%",
    marginHorizontal: "30%",
  },
  header: {
    flex: 1,
    marginTop: 30,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#2E86C1",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 10,
  },
  text_footer: {
    color: "#2F80ED",
    fontSize: 16,
    fontWeight: "500",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    borderRadius: 3,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#0391D7",
  },
});
