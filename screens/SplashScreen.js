import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={require('../assets/splash.png')} style={styles.imageBG}>
            <View style={styles.header}>
            <Animatable.Image 
                    animation="bounceIn"
                    duraton="1500"
                source={require('../assets/logo--SCG.png')}
                style={styles.logoSCG}
                resizeMode="stretch"
                />
                <Animatable.Image 
                    animation="bounceIn"
                    duraton="1500"
                source={require('../assets/splash_img.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
            </View>
            <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={[styles.bigtitle, {
                color: "#21618C" 
            }]}>All In One System</Text>
            <Text style={[styles.title, {
                color: colors.text
            }]}>Driven Your Success</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={['#56CCF2', '#2F80ED']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
            <View style={styles.bottomArea}>
                <Text>
                    Developed by 
                </Text>
                <Image source={require('../assets/logo_UNIC.png')} style={styles.logoUNIC}/>
            </View>
        </Animatable.View>
        </ImageBackground>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#5DADE2'
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    
    justifyContent: "center"
  },
  logoSCG:{
      height: 50,
      width: 130,
  },
  header: {
      flex: 1.7,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo * 1.4,
      height: height_logo,
  },
  bigtitle:{
      fontSize: 40,
      fontWeight: 'bold',
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: '700'
  },
  text: {
      color: '#6A6A6A',
      marginTop:5,
      fontSize: 15,
  },
  button: {
      alignItems: 'center',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  },
  bottomArea:{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5%',
      color: '#6A6A6A',
      flexDirection: 'row'
  },
  logoUNIC:{
      width: 80,
      height:30,
  }
});

