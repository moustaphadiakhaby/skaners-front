import { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "react-native-dotenv";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const [skans, setSkans] = useState([]);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        const userId = await AsyncStorage.getItem("userId");
        const [responseParcourir, responseLikes] = await Promise.all([
          axios.get(`${API_URL}/pictures`),
          axios({
            method: "GET",
            url: `${API_URL}/user/info/${userId}`,
            headers: headers,
          }),
        ]);
        //TODO CHECK HERE

        setSkans(responseLikes.data.skans.reverse());
        setPictures(responseParcourir.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error : ", error.message);
      }
    };

    fetchPictures();
  }, [refreshing]);

  if (isLoading === true) {
    return <Loading />;
  } else
    return (
      <ScrollView
        style={{ backgroundColor: "white" }}
        refreshControl={
          <RefreshControl
            size={"large"}
            tintColor={"#FF7E00"}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ paddingTop: 10 }}>
          {skans.length > 0 && (
            <Text style={styles.title}>MES DERNIERS SKANS</Text>
          )}
          <ScrollView horizontal={true}>
            <View style={styles.likesContainer}>
              {Array.isArray(skans) &&
                skans.map((skan, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate("ProductCardSkanScreen", {
                          product: skan,
                        });
                      }}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={{ uri: skan?.pictureUrl }}
                        key={skan.id}
                        style={{
                          height: 0.13 * height,
                          width: 0.6 * width,
                          borderRadius: 10,
                          marginHorizontal: 3,
                          marginVertical: 5,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>

          <Text style={styles.title}>PARCOURIR</Text>
          <View>
            <View style={styles.layoutContainer}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: "50%",
                    marginHorizontal: wp(1.25),
                  }}
                >
                  {Array.isArray(pictures) &&
                    pictures.map((elem, index) => {
                      if (index % 2 === 0) {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            key={index}
                            onPress={() => {
                              navigation.navigate("HomeView", {
                                id: elem._id,
                                url: elem.url,
                              });
                            }}
                          >
                            <Image
                              key={elem.id}
                              source={{ uri: elem.url }}
                              style={{
                                height:
                                  index % 3 === 0 ? 0.2 * height : 0.3 * height, // Here we check if the index is even or odd
                                width: 0.43 * width,
                                resizeMode: "cover",
                                borderRadius: 10,
                                marginBottom: 9,
                              }}
                            />
                          </TouchableOpacity>
                        );
                      }
                    })}
                </View>
                <View
                  style={{
                    width: "50%",
                    marginHorizontal: wp(1.25),
                  }}
                >
                  {Array.isArray(pictures) &&
                    pictures.map((elem, index) => {
                      if (index % 2 !== 0) {
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              navigation.navigate("HomeView", {
                                id: elem._id,
                                url: elem.url,
                              });
                            }}
                            activeOpacity={0.8}
                          >
                            <Image
                              key={elem.id}
                              source={{ uri: elem.url }}
                              style={{
                                height:
                                  index % 3 !== 0 ? 0.3 * height : 0.2 * height, // Here we check if the index is even or odd
                                width: 0.43 * width,
                                resizeMode: "cover",
                                borderRadius: 10,
                                marginBottom: 9,
                              }}
                            />
                          </TouchableOpacity>
                        );
                      }
                    })}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
}
const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 15,
    fontFamily: "LemonMilkBold",
    textAlign: "left",
    color: "#FF7E00",
    paddingLeft: 15,
    fontFamily: "LouisGeorge",
  },
  pictureContainer: {
    paddingHorizontal: 0,
  },
  likesContainer: { flexDirection: "row" },
  layoutContainer: {
    paddingHorizontal: wp("7%"),
    alignItems: "center",
  },

  pictureSneakers: {
    resizeMode: "cover",
    borderRadius: 2,
  },
});
