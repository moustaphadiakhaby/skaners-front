import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "react-native-dotenv";

const PictureHomeView = ({ route, token }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [like, setLike] = useState();

  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.get(`${API_URL}/user/info/${userId}`, {
          headers: { Authorization: "Bearer " + token },
        });
        response.data.likes.find((picture) => {
          if (JSON.stringify(picture._id) === JSON.stringify(route.params.id)) {
            setLike(true);
            return true;
          } else {
            setLike(false);
            return false;
          }
        });

        // setUserLikes(response.data.likes);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const likePicture = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const headers = { Authorization: "Bearer " + token };
      const bodyParams = { userId: userId, pictureId: id };
      const response = await axios({
        method: "PUT",
        url: `${API_URL}/user/likePicture`,
        headers: headers,
        data: bodyParams,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const unlikePicture = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const headers = { Authorization: "Bearer " + token };
      const bodyParams = { userId: userId, pictureId: id };

      const response = await axios({
        method: "PUT",
        url: `${API_URL}/user/unlikePicture`,
        headers: headers,
        data: bodyParams,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ position: "relative", backgroundColor: "white" }}>
      {id && (
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 1,
            top: "86%",
            left: "80%",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 40,
          }}
          activeOpacity={1}
          onPress={() => {
            setLike(!like);
            if (like) {
              unlikePicture();
            } else {
              likePicture();
            }
          }}
        >
          <AntDesign
            name={like ? "heart" : "hearto"}
            size={45}
            color="tomato"
          />
        </TouchableOpacity>
      )}
      <Image
        source={{ uri: route.params.url }}
        style={{ height: "100%", resizeMode: "contain" }}
      />
    </View>
  );
};

export default PictureHomeView;

const styles = StyleSheet.create({});
