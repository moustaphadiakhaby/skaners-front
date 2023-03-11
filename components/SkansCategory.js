import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Loading from "./Loading";
import { API_URL } from "react-native-dotenv";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SkansCategory = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();
  const [userName, setUserName] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      const userId = await AsyncStorage.getItem("userId");
      try {
        const response = await axios({
          method: "GET",
          url: `${API_URL}/user/info/${userId}`,
          headers: headers,
        });
        setData(response.data.skans.reverse());
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
          Tu n'as pas encore de skans {userName} !
        </Text>
      </View>
    ) : (
      <View style={styles.background}>
        <ScrollView>
          <View style={styles.skanContainer}>
            {data.map((skan, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("ProductCardSkanScreen", {
                      product: skan,
                    });
                  }}
                  style={{ width: wp(40), marginVertical: 7 }}
                  activeOpacity={0.8}
                >
                  <Image style={styles.img} source={{ uri: skan.pictureUrl }} />
                  <Text
                    numberOfLines={1}
                    style={{
                      textAlign: "center",
                      color: "#717171",
                      fontFamily: "LouisGeorgeBoldItalic",
                    }}
                  >
                    {skan.sneakerName}
                  </Text>
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
  skanContainer: {
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

export default SkansCategory;
