import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import imagesAvatar from "../assets/Json/avatar-url.json";
import Avatar from "../components/Avatars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "react-native-dotenv";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ChooseUserAvatarScreens = ({ route, setToken }) => {
  const [avatar, setAvatar] = useState(
    "https://cdn.shopify.com/s/files/1/2358/2817/products/air-jordan-1-retro-high-85-og-black-white-1_2000x.png?v=1676450597"
  );
  const [isSelected, setIsSelected] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const accountInfos = {
    email: route.params.email,
    userName: route.params.userName,
    password: route.params.password,
    firstName: route.params.firstName,
    lastName: route.params.lastName,
    dateOfBirth: route.params.dateOfBirth,
    phoneNumber: route.params.phoneNumber,
    sex: route.params.sex,
    shoeSize: route.params.shoeSize,
    favoriteBrand: route.params.favoriteBrand,
    pictureUrl: avatar,
  };

  useEffect(() => {
    const signUp = async () => {
      try {
        if (submit) {
          const response = await axios.post(`${API_URL}/signup`, {
            email: accountInfos.email,
            userName: accountInfos.userName,
            password: accountInfos.password,
            firstName: accountInfos.firstName,
            lastName: accountInfos.lastName,
            dateOfBirth: accountInfos.dateOfBirth,
            phoneNumber: accountInfos.phoneNumber,
            sex: accountInfos.sex,
            favoriteBrand: accountInfos.favoriteBrand,
            shoeSize: accountInfos.shoeSize,
            pictureUrl: avatar,
          });

          setErrorMessage("");
          if (response.data.token) {
            setToken(response.data.token);
            await AsyncStorage.setItem("userId", response.data.user._id);
            await AsyncStorage.setItem(
              "userPfp",
              response.data.user.pictureUrl
            );
          }
        }
      } catch (error) {
        setErrorMessage("Adresse email ou userName déjà utilisé");
        setSubmit(false);
      }
    };
    signUp();
  }, [submit]);

  return (
    <View style={styles.finalizeContainer}>
      <Text style={styles.title}>Finalise ton inscription !</Text>
      <View>
        <Text style={styles.subTitle}>CHOISIS TON AVATAR</Text>
        <View style={styles.avatarsList}>
          {imagesAvatar.avatars.map((img, index) => {
            return (
              <View key={index} style={{ marginTop: 50 }}>
                <Avatar
                  key={index}
                  picture={img}
                  setAvatar={setAvatar}
                  avatar={avatar}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View>
        {!submit ? (
          <TouchableOpacity
            style={styles.signUpBtn}
            disabled={submit}
            onPress={() => {
              setSubmit(true);
            }}
          >
            <Text style={styles.signUpTxt}>Valider</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator
            style={styles.load}
            size={"large"}
            color={"#FF7E00"}
          />
        )}
        <Text style={styles.errorTxt}>{errorMessage}</Text>
      </View>
    </View>
  );
};

export default ChooseUserAvatarScreens;
const styles = StyleSheet.create({
  finalizeContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  avatarsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  title: {
    paddingTop: hp("2.5%"),
    alignContent: "center",
    fontSize: 28,
    color: "#FF7E00",

    fontFamily: "LouisGeorge",
  },
  subTitle: {
    fontSize: 23,
    fontFamily: "LemonMilkBold",
    textAlign: "center",
    color: "#717171",
    fontFamily: "LouisGeorge",
  },
  signUpBtn: {
    height: 50,
    backgroundColor: "#FF7E00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    height: hp("5%"),
    width: wp("60%"),
  },
  load: {
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    height: hp("5%"),
    width: wp("60%"),
  },
  errorTxt: {
    fontFamily: "LouisGeorge",
    color: "#F86F00",
    marginHorizontal: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpTxt: {
    fontFamily: "LouisGeorgeBold",
    color: "white",
    fontSize: 23,
  },
});
