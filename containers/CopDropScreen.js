import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet, Image } from "react-native";
import TinderCard from "react-tinder-card";
import axios from "axios";
import logo from "../assets/Images/skanerslogoS.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { API_URL } from "react-native-dotenv";

const CopDropScreen = ({ token }) => {
  const [lastDirection, setLastDirection] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const [idLike, setIdLike] = useState();
  const [idUser, setIdUser] = useState();
  const [userSkans, setUserSkans] = useState();

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    const sendLike = async () => {
      try {
        if (lastDirection !== "right") {
          return;
        }
        await axios({
          method: "PUT",
          url: `${API_URL}/user/likeSkan`,
          data: {
            skanId: idLike,
            userId: idUser,
          },
          headers: headers,
        });
        setLastDirection("");
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${API_URL}/allSkans`,
          headers: headers,
        });
        const responseUser = await axios({
          method: "GET",
          url: `${API_URL}/user/info/${idUser}`,
          headers: headers,
        });
        setUserSkans(responseUser.data.skans.reverse());
        if (!idUser) {
          return;
        }
        // je filtre le tableau une premiere fois pour avoir que les skans validés
        const tempTab = response.data.filter((sneaker) => sneaker.isChecked);

        // je filtre une 2 eme fois pour avoir que les skans validés qui ne viennent pas de notre user
        setData(tempTab.filter((sneaker) => sneaker.userId !== idUser));

        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getId = async () => {
      const idUser = await AsyncStorage.getItem("userId");
      setIdUser(idUser);
    };
    getId();
    fetchData();
    sendLike();
  }, [lastDirection, idUser]);

  const swiped = (direction, id) => {
    setLastDirection(direction);
    if (direction === "right") {
      setIdLike(id);
    }
  };

  return isLoad ? (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {data.length > 0 ? (
          data.map((shoe) => (
            <TinderCard key={shoe._id} onSwipe={(dir) => swiped(dir, shoe._id)}>
              <View style={styles.card}>
                <ImageBackground
                  style={styles.cardImage}
                  source={{ uri: shoe.pictureUrl }}
                ></ImageBackground>
              </View>
            </TinderCard>
          ))
        ) : (
          <Text
            style={{
              height: "100%",
              textAlign: "center",
              lineHeight: hp(70),
              fontFamily: "LouisGeorge",
              fontSize: hp(2.5),
            }}
          >
            Quel crack t'as swipe toutes les paires
          </Text>
        )}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.drop}>
          <Text style={styles.copDropText}>DROP</Text>
        </View>

        <View style={styles.cop}>
          <Text style={styles.copDropText}>COP</Text>
          <View style={styles.sparksContainer}></View>
        </View>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>
      </View>
    </View>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "white",
  },
  card: {
    position: "absolute",
    width: wp("100%"),
    height: hp("100%"),
  },

  cardImage: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    flex: 1,
    position: "absolute",
    bottom: hp("2%"),
    left: wp("20%"),
  },
  cop: {
    backgroundColor: "#FF7E00",
    fontSize: 30,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: wp("31%"),
    height: hp("7%"),
    lineHeight: hp("7%"),
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
    fontFamily: "LouisGeorge",
    paddingLeft: 20,
  },

  drop: {
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    fontSize: 30,
    width: wp("31%"),
    height: hp("7%"),
    lineHeight: hp("7%"),
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
    fontFamily: "LouisGeorge",
    paddingRight: 20,
  },

  copDropText: {
    fontSize: 30,
    lineHeight: hp("7%"),
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
    fontFamily: "LouisGeorge",
  },

  logo: {
    width: wp("12.5%"),
    height: hp("6%"),
    backgroundColor: "white",
    borderRadius: 20,
    resizeMode: "contain",
  },
  logoContainer: {
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 6,
    borderRadius: 200,
    position: "absolute",
    left: wp("24%"),
    bottom: hp("1%"),
  },

  sparksContainer: {
    position: "absolute",
    left: wp("7%"),
    bottom: hp("0.01%"),
  },
  sparks: {
    // flex: 1,
    width: 250,
    height: 100,
  },
  // infoText: {
  //   height: 28,
  //   justifyContent: "center",
  //   // zIndex: -100,
  //   backgroundColor: "yellow",
  // },
});

export default CopDropScreen;
