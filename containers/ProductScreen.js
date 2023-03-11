import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "react-native-dotenv";
import Loading from "../components/Loading";
const ProductScreen = ({ route, token }) => {
  const [sneakersData, setSneakersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [like, setLike] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const [responseSneakers, responseUserInfo] = await Promise.all([
          axios.get(`${API_URL}/sneakers/${route.params.id}`),
          axios.get(`${API_URL}/user/info/${userId}`, {
            headers: { Authorization: "Bearer " + token },
          }),
        ]);
        responseUserInfo.data.sneakers.find((sneaker) => {
          if (JSON.stringify(sneaker._id) === JSON.stringify(route.params.id)) {
            setLike(true);
            return true;
          } else {
            setLike(false);
            return false;
          }
        });

        setSneakersData(responseSneakers.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const likeSneaker = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const headers = { Authorization: "Bearer " + token };
      const bodyParams = { userId: userId, sneakerId: route.params.id };
      const response = await axios({
        method: "PUT",
        url: `${API_URL}/user/likeSneaker`,

        headers: headers,
        data: bodyParams,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const unlikeSneaker = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const headers = { Authorization: "Bearer " + token };
      const bodyParams = { userId: userId, sneakerId: route.params.id };
      const response = await axios({
        method: "PUT",
        url: `${API_URL}/user/unlikeSneaker`,
        headers: headers,
        data: bodyParams,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.productScreenContainer}>
          <Image
            source={{ uri: sneakersData.picture }}
            resizeMode="cover"
            style={{
              width: wp("100%"),
              height: hp("30%"),
              marginTop: hp(2),
            }}
          />
          <View style={styles.detailsContainer}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.priceContainer}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "LouisGeorge",
                    fontSize: hp(2),
                  }}
                >
                  PRIX RETAIL
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontFamily: "LouisGeorge",
                    fontSize: hp(2),
                  }}
                >
                  {sneakersData.price / 100} €
                </Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.priceResell}>
                <Text
                  style={{
                    color: "white",
                    fontFamily: "LouisGeorgeBold",
                    fontSize: hp(2),
                  }}
                >
                  PRIX RESSEL
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontFamily: "LouisGeorge",
                    fontSize: hp(2),
                  }}
                >
                  {sneakersData.price / 100 + 300} € et +
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerNameAndLike}>
              <TouchableOpacity
                onPress={() => {
                  setLike(!like);
                  if (like) {
                    unlikeSneaker();
                  } else {
                    likeSneaker();
                  }
                }}
                activeOpacity={1}
              >
                {like ? (
                  <AntDesign
                    name="heart"
                    size={30}
                    style={{ color: "#FF7E00" }}
                  />
                ) : (
                  <AntDesign
                    name="hearto"
                    size={30}
                    style={{ color: "#FF7E00" }}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.sneakerName}>
                {sneakersData.name.toUpperCase()}
              </Text>
            </View>

            <Text style={styles.brandAndColor}>LIENS</Text>
            <View
              style={{
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  Linking.openURL(
                    `https://stockx.com/fr-fr/search?s=${sneakersData.name}`
                  )
                }
                style={{ width: 100, height: 70 }}
              >
                <Image
                  source={require("../assets/Images/logo_stockx.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  Linking.openURL(
                    `https://www.goat.com/search?query=${sneakersData.name}`
                  )
                }
                style={{ width: 100, height: 70 }}
              >
                <Image
                  source={require("../assets/Images/logo_goat.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  Linking.openURL(
                    `https://restocks.net/fr/shop/?q=${sneakersData.name}`
                  )
                }
                style={{ width: 100, height: 70 }}
              >
                <Image
                  source={require("../assets/Images/logo_restocks.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default ProductScreen;

const styles = StyleSheet.create({
  productScreenContainer: {
    height: hp("75%"),
    width: wp("100%"),
    backgroundColor: "white",
  },
  detailsContainer: {
    alignItems: "center",
    flex: 1,
  },
  priceContainer: {
    backgroundColor: "#717171",
    paddingHorizontal: 35,
    marginHorizontal: 5,
    borderRadius: 40,
    height: hp(7),
    width: wp("45%"),
    alignItems: "center",
    justifyContent: "center",
  },
  priceResell: {
    backgroundColor: "#FF7E00",
    paddingHorizontal: 35,
    marginHorizontal: 5,
    borderRadius: 40,
    justifyContent: "center",
    width: wp("45%"),
    alignItems: "center",
  },
  containerNameAndLike: {
    flexDirection: "row",
    width: wp(90),
    borderBottomColor: "#FF7E00",
    borderBottomWidth: 1,
    marginVertical: hp(2),
    paddingTop: hp(2),
    paddingBottom: hp(4),
    justifyContent: "center",
    alignItems: "center",
  },
  sneakerName: {
    fontFamily: "LouisGeorge",
    fontSize: 20,
    paddingLeft: wp(4),
    width: "90%",
  },
  lineBetween: {
    width: wp("45%"),
    borderBottomColor: "black",
    backgroundColor: "black",
  },
  brandAndColor: {
    fontSize: 20,
    color: "#FF7E00",
    marginVertical: wp(5),
    width: wp(90),
    fontFamily: "LouisGeorge",
  },
});
