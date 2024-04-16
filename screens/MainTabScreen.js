import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import SignInScreen from './SignInScreen';

import {Avatar} from 'react-native-paper';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator 
    initialRouteName="Home"  
    activeColor="#337fd1"
    inactiveColor="#B2BABB"
    
    barStyle={{ backgroundColor: '#E5E8E8' }}
    tabBarOptions={{
      style:{
        backgroundColor: 'green'
      }
    }}
    >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#337fd1',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: 'Updates',
        tabBarColor: '#337fd1',
        tabBarIcon: ({color}) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#337fd1',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#337fd1',
          shadowColor: '#337fd1', // iOS
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'EPay',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color='white'
                backgroundColor='#337fd1'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-search"
                size={25}
                color='#fff'
                backgroundColor='#337fd1'
                onPress={() => {}}
              />
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:
                      'https://i.pravatar.cc/150?img=9',
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      {/* <HomeStack.Screen 
        name="SignInScreen"
        component={SignInScreen}
      /> */}
      <HomeStack.Screen 
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen 
        name="CardItemDetails"
        component={CardItemDetails}
        options={({route}) => ({
          title: route.params.itemData.name,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#337fd1"
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = ({navigation}) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#337fd1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <NotificationStack.Screen
      name="Notifications"
      component={NotificationScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#337fd1"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationStack.Navigator>
);

const ProfileStackScreen = ({navigation}) => {

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#337fd1',
          shadowColor: '#337fd1', // iOS
          elevation: 0, // Android
        },
        headerTintColor: '#fff',
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor='#337fd1'
                color='#fff'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor='#337fd1'
          //       color='#fff'
          //     />
          //   </View>
          // ),
        }}
      />
      <ProfileStack.Screen
        name="Profile Screen"
        options={{
          title: 'Profile',
        }}
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
