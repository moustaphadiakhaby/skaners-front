import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/Images/logo.png";
import skanersLogo from "../assets/Images/skaners.jpg";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.background}>
      <View style={styles.picutreContainer}>
        <Image source={logo} style={styles.logo} />
        <Image
          source={skanersLogo}
          style={styles.skanersLogo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.btnBox}>
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => {
            navigation.navigate("Create User Account");
          }}
        >
          <Text style={styles.txt}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.txt}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginTop: 45,
  },
  skanersLogo: {
    width: 280,
    height: 75,
    marginTop: 20,
  },
  picutreContainer: {
    alignItems: "center",
    flex: 4.3,

    justifyContent: "flex-end",
  },
  btnBox: { flex: 2, justifyContent: "center", marginTop: 130 },

  signInBtn: {
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginBottom: 80,
  },
  signUpBtn: {
    height: 50,
    backgroundColor: "#FF7E00",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 30,
  },

  txt: {
    fontFamily: "LouisGeorgeBold",
    color: "white",
    fontSize: 23,
  },

  background: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
});

export default WelcomeScreen;
