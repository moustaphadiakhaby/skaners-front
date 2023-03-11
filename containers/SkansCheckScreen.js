import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";
import { API_URL } from "react-native-dotenv";

const SkansCheckScreen = ({ navigation, token }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    try {
      const headers = {
        Authorization: "Bearer " + token,
      };
      const fetchData = async () => {
        const response = await axios({
          method: "GET",
          url: `${API_URL}/allSkans`,
          headers: headers,
        });

        const newTab = [];

        for (let i = 0; i < response.data.length; i++) {
          if (!response.data[i].isChecked) {
            newTab.unshift(response.data[i]);
          }
        }

        setData(newTab);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [isFocused, deleted]);

  const handleSkanDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteSkan/${id}`);
      setDeleted(!deleted);
    } catch (error) {
      console.log(error.message);
    }
  };

  return loading ? (
    <Loading />
  ) : data.length <= 0 ? (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.textCheck}>Tous les skans ont été checkés</Text>
    </View>
  ) : (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Text style={styles.textCheck}>
        Il reste {data.length} skan{data.length > 1 && "s"} à checker
      </Text>
      {Array.isArray(data) &&
        data.map((elem, i) => {
          return (
            elem.isChecked === false && (
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
                key={i}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SingleSkan", {
                      elem,
                    });
                  }}
                >
                  <Image
                    style={styles.skan}
                    source={{ uri: elem.pictureUrl }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnDelete}
                  onPress={() => {
                    handleSkanDelete(elem._id);
                  }}
                >
                  <Text style={styles.btnDeleteTxt}>Delete</Text>
                </TouchableOpacity>
              </View>
            )
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textCheck: { textAlign: "center", marginTop: 10 },
  btnDelete: {
    backgroundColor: "red",
    flex: 1,
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },

  btnDeleteTxt: {
    color: "white",
    fontFamily: "LouisGeorgeBold",
    textAlign: "center",
    fontSize: 20,
  },

  skan: {
    height: 200,
    width: 300,
    borderRadius: 5,
    marginLeft: 5,
    backgroundColor: "black",
    borderWidth: 3,
    marginVertical: 10,
  },
});

export default SkansCheckScreen;
