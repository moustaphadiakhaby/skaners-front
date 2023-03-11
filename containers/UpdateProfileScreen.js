import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { API_URL } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdateProfileScreen({ route, navigation }) {
  const data = route.params.elem;
  const [userName, setUserName] = useState(data.userName);
  const [email, setEmail] = useState(data.email);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [shoeSize, setShoeSize] = useState(data.shoeSize);
  const [favoriteBrand, setFavoriteBrand] = useState(data.favoriteBrand);

  const bodyParams = {
    userName,
    email,
    phoneNumber,
    shoeSize,
    favoriteBrand,
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      if (
        userName === data.userName &&
        email === data.email &&
        phoneNumber === data.phoneNumber &&
        shoeSize === data.shoeSize &&
        favoriteBrand === data.favoriteBrand
      ) {
        navigation.goBack();
      } else {
        axios({
          method: "PUT",
          url: `${API_URL}/user/update/${data._id}`,
          headers: headers,
          data: bodyParams,
        });
        const createTwoButtonAlert = () =>
          Alert.alert("Message", "Vos informations ont été mises à jour");

        createTwoButtonAlert();
        navigation.goBack();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View>
          <View style={styles.avatarBox}>
            <Image
              source={
                data.pictureUrl
                  ? { uri: data.pictureUrl }
                  : require("../assets/Images/blank_pfp.png")
              }
              style={styles.avatar}
            />
          </View>
          <View style={styles.parameters}>
            <Text style={styles.paramsTitle}>PARAMETRES</Text>
            <View style={styles.infoBox}>
              <Text style={styles.labelColor}>Nom d'utilisateur</Text>
              <TextInput
                style={styles.txtInput}
                value={userName}
                onChangeText={(e) => {
                  setUserName(e);
                }}
              />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.labelColor}>Adresse e-mail</Text>
              <TextInput
                style={styles.txtInput}
                value={email}
                onChangeText={(e) => {
                  setEmail(e);
                }}
              />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.labelColor}>Numéro de téléphone</Text>
              <TextInput
                style={styles.txtInput}
                value={phoneNumber}
                onChangeText={(e) => {
                  setPhoneNumber(e);
                }}
              />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.labelColor}>Pointure</Text>
              <TextInput
                style={styles.txtInput}
                value={shoeSize}
                onChangeText={(e) => {
                  setShoeSize(e);
                }}
              />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.labelColor}>Marque favorite</Text>
              <TextInput
                style={styles.txtInput}
                value={favoriteBrand}
                onChangeText={(e) => {
                  setFavoriteBrand(e);
                }}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },

  txtInput: {
    fontSize: hp("2%"),
    fontFamily: "LouisGeorge",
    paddingVertical: 5,
    backgroundColor: "lightgray",
    borderRadius: 20,
    paddingLeft: 20,
  },

  input: {},

  avatar: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    borderRadius: 100,
    borderColor: "#717171",
    borderWidth: 2,
  },

  name: {
    fontSize: hp("3%"),
    textAlign: "center",
    color: "#515151",
    marginTop: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  avatarBox: {
    paddingVertical: 20,
    marginBottom: 10,
    alignItems: "center",
  },

  parameters: {
    width: wp("90%"),
  },

  paramsTitle: {
    fontSize: hp("2%"),
    marginBottom: hp("2.5%"),
  },

  infoBox: {
    justifyContent: "space-between",
    marginBottom: hp("2.5%"),
  },

  labelColor: {
    color: "#717171",
    fontSize: hp("2%"),
    fontFamily: "LouisGeorge",
  },

  btn: {
    height: 50,
    backgroundColor: "green",
    borderRadius: 15,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 40,
  },

  btnTxt: {
    color: "white",
    fontSize: 23,
    fontFamily: "LouisGeorgeBold",
  },
});
