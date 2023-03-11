import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";
import { API_URL } from "react-native-dotenv";
import { Feather } from "@expo/vector-icons";
export default function ProfileScreen({ navigation, setToken }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const token = await AsyncStorage.getItem("userToken");
        const headers = {
          Authorization: "Bearer " + token,
        };
        const id = await AsyncStorage.getItem("userId");
        if (id) {
          const response = await axios({
            method: "GET",
            url: `${API_URL}/user/info/${id}`,
            headers: headers,
          });

          setData(response.data);
        } else {
          alert("Bad request");
        }
      };
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [isFocused]);

  const deleteAccount = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: "Bearer " + token,
      };
      await axios({
        method: "DELETE",
        url: `${API_URL}/user/delete/${userId}`,
        headers: headers,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Suppression du compte",
      "Es-tu sûr de vouloir supprimer ton compte ?",
      [
        {
          text: "Oui",
          onPress: async () => {
            await deleteAccount();
            setToken(null);
            AsyncStorage.removeItem("userId");
            AsyncStorage.removeItem("userPfp");
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

  return loading ? (
    <Loading />
  ) : (
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
          <TouchableOpacity
            style={styles.deleteAccount}
            onPress={() => {
              showAlert();
            }}
          >
            <Feather name="trash-2" size={34} color="#FF7E00" />
          </TouchableOpacity>

          <Text style={styles.name}>
            {data.firstName ? data.firstName : data.userName}
          </Text>
          <Text style={styles.txt}>{data.firstName && data.userName}</Text>
        </View>
        <View style={styles.parameters}>
          <Text style={styles.paramsTitle}>PARAMETRES</Text>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Nom d'utilisateur</Text>
            <Text style={styles.txt}>{data.userName}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Adresse e-mail</Text>
            <Text style={styles.txt}>{data.email}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Numéro de téléphone</Text>
            <Text style={styles.txt}>{data.phoneNumber}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Pointure</Text>
            <Text style={styles.txt}>
              {data.shoeSize && `${data.shoeSize} EU`}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelColor}>Marque favorite</Text>
            <Text style={styles.txt}>{data.favoriteBrand}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UpdateProfile", {
              elem: data,
            });
          }}
        >
          <Text style={styles.updateText}>Mettre à jour les informations</Text>
        </TouchableOpacity>
      </View>

      {data.adminRank > 0 && (
        <TouchableOpacity
          style={styles.btnAdmin}
          onPress={() => {
            navigation.navigate("SkansCheck", { id: data._id });
          }}
        >
          <Text style={styles.btnAdminTxt}>Check the Skans</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setToken(null);
          AsyncStorage.removeItem("userId");
          AsyncStorage.removeItem("userPfp");
        }}
      >
        <Text style={styles.btnTxt}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },

  txt: {
    fontSize: hp("2%"),
    fontFamily: "LouisGeorge",
  },

  avatar: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    borderRadius: 100,
    borderColor: "#717171",
    borderWidth: 2,
  },

  btnAdmin: {
    padding: hp("1.5%"),
    borderRadius: wp("2%"),
    backgroundColor: "#FF7E00",
  },

  btnAdminTxt: {
    color: "white",
    fontSize: 18,
    fontFamily: "LouisGeorgeBold",
  },

  name: {
    fontFamily: "LemonMilkBold",
    fontSize: hp("3%"),
    textAlign: "center",
    color: "#515151",
    marginTop: hp("1%"),
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
    flexDirection: "row",
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
    backgroundColor: "#000",
    borderRadius: 15,
    width: wp(80),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: hp("2.5%"),
  },

  btnTxt: {
    fontFamily: "LouisGeorgeBold",
    color: "white",
    fontSize: 23,
  },

  updateText: {
    fontSize: hp("2.3%"),
    textAlign: "center",
    fontFamily: "LouisGeorge",
    textDecorationLine: "underline",
  },

  deleteAccount: {
    position: "absolute",
    right: wp("1%"),
    top: hp("2%"),
  },
});
