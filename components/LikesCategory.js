import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./Loading";
import axios from "axios";
import { API_URL } from "react-native-dotenv";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LikesCategory = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const [userName, setUserName] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("userToken");
        const headers = {
          Authorization: "Bearer " + token,
        };

        if (!userId) {
          return;
        }
        const response = await axios({
          method: "GET",
          url: `${API_URL}/user/info/${userId}`,
          headers: headers,
        });
        setData(response.data.likes.reverse());
        setUserName(response.data.userName);

        setIsLoad(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [isFocused]);

  return isLoad ? (
    data.length === 0 ? (
      <View style={styles.background}>
        <Text style={styles.text}>
          Tu n'as pas encore de likes {userName} !
        </Text>
      </View>
    ) : (
      <View style={styles.background}>
        <ScrollView>
          <View style={styles.likeContainer}>
            {data.map((picture, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("ProductCardLikeScreen", {
                      id: picture._id,
                      url: picture.url,
                    });
                  }}
                  style={{ width: wp(40), marginVertical: 7 }}
                  activeOpacity={0.8}
                >
                  <Image style={styles.img} source={{ uri: picture.url }} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    )
  ) : (
    <Loading />
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  likeContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  text: {
    fontFamily: "LouisGeorge",
    fontSize: hp(2.5),
    textAlign: "center",
    marginTop: hp(2),
    color: "#FF7E00",
  },
  img: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
});
export default LikesCategory;
