import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API_URL } from "react-native-dotenv";

const ProductCardScreenSkan = ({ route, navigation }) => {
  const product = route.params.product;

  const sendData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      await axios({
        method: "PUT",
        url: `${API_URL}/user/unlikeSkan`,
        data: { userId: userId, skanId: product._id },
        headers: headers,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Confirmation",
      "Es-tu sûr de vouloir supprimer ce skan ?",
      [
        {
          text: "Oui",
          onPress: async () => {
            await sendData();

            navigation.goBack();
          },
          style: "default",
        },
        {
          text: "Non",
          onDismiss: () => {},
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: product.pictureUrl }} />
          <TouchableOpacity
            style={styles.delete}
            activeOpacity={1}
            onPress={() => {
              showAlert();
            }}
          >
            <Entypo name="cross" size={40} color="#F86F00" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infosContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelColor}>Référence :</Text>
          <Text style={styles.text}>{product.sneakerName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.labelColor}>Marque : </Text>
          <Text style={styles.text}>{product.description}</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.lineBetween}></View>
      </View>
      <View style={styles.infosContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.labelColor}>Liens : </Text>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://stockx.com/fr-fr/search?s=${product.sneakerName}`
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
          onPress={() =>
            Linking.openURL(
              `https://www.goat.com/search?query=${product.sneakerName}`
            )
          }
          style={{ width: 100, height: 70, marginHorizontal: 20 }}
        >
          <Image
            source={require("../assets/Images/logo_goat.png")}
            style={{ width: "100%", height: "100%" }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://restocks.net/fr/shop/?q=${product.sneakerName}`
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
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    alignContent: "center",
    justifyContent: "center",
  },
  imgContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  img: {
    width: wp("100%"),
    backgroundColor: "black",
    height: hp("50%"),
    resizeMode: "contain",
  },
  infosContainer: {
    width: wp("90%"),
    marginHorizontal: 20,
  },
  delete: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 40,
    top: hp("2%"),
    right: wp("4%"),
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp("1.5%"),
  },

  text: {
    fontSize: hp("2%"),
    fontFamily: "LouisGeorgeBold",
    width: wp("65%"),
  },

  labelColor: {
    color: "#FF7E00",
    fontSize: hp("2%"),
    fontFamily: "LouisGeorge",
  },
  lineBetween: {
    width: wp("90%"),
    borderBottomColor: "#FF7E00",
    borderBottomWidth: 1,
  },
});

export default ProductCardScreenSkan;
