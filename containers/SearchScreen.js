import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Image,
  Dimensions,
  Platform,
} from "react-native";

import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import Loading from "../components/Loading";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { API_URL } from "react-native-dotenv";
const SearchScreen = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [sneakers, setSneakers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const navigation = useNavigation();

  const handleName = (name) => {
    setName(name);
  };
  const handleBrand = (brand) => {
    setBrand(brand);
  };
  const handleColor = (color) => {
    setColor(color);
  };

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/sneakers?name=${name}&brand=${brand}&color=${color}`
        );
        setSneakers(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSneakers();
  }, [name, brand, color]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          return setDisplaySearchBar(!displaySearchBar);
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleSearch}>
            <Ionicons name="md-search-outline" size={18} color="#FF7E00" />{" "}
            RECHERCHER
          </Text>
          {displaySearchBar ? (
            <SimpleLineIcons
              name="arrow-up"
              size={18}
              color="#FF7E00"
              style={{ paddingHorizontal: 15 }}
            />
          ) : (
            <SimpleLineIcons
              name="arrow-down"
              size={18}
              color="#FF7E00"
              style={{ paddingHorizontal: 15 }}
            />
          )}
        </View>
      </TouchableOpacity>
      {displaySearchBar && (
        <View
          style={[
            {
              height: hp("25%"),
              alignItems: "center",

              justifyContent: "space-around",
            },
            styles.searchContainer,
          ]}
        >
          <TextInput
            placeholderTextColor="#717171"
            placeholder="Modele..."
            style={styles.input}
            onChangeText={handleName}
            value={name}
          ></TextInput>
          <TextInput
            placeholderTextColor="#717171"
            placeholder="Marque..."
            style={styles.input}
            onChangeText={handleBrand}
            value={brand}
          ></TextInput>

          <TextInput
            placeholderTextColor="#717171"
            placeholder="Couleur..."
            style={styles.input}
            onChangeText={handleColor}
            value={color}
          ></TextInput>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => {
                setBrand("");
                setColor("");
                setName("");
              }}
              style={styles.clearButton}
            >
              <Text style={styles.clearBtnTxt}>EFFACER</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ paddingHorizontal: 9 }}>
          <FlatList
            style={{ marginBottom: Platform.OS === "ios" ? 60 : 60 }}
            data={sneakers}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ProductScreen", {
                      id: item._id,
                    });
                  }}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      height: hp("23%"),

                      width: wp("45%"),
                      borderRadius: 8,
                      borderRadius: 10,
                      marginVertical: 5,
                      marginHorizontal: 5,
                      backgroundColor: "white",

                      justifyContent: "space-evenly",
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Image
                        source={{ uri: item.picture }}
                        style={{
                          width: wp("40%"),
                          height: hp("15%"),
                        }}
                      />
                    </View>
                    <View style={{ justifyContent: "flex-start" }}>
                      <Text
                        style={{
                          fontFamily: "LouisGeorgeBold",
                          color: "black",
                          fontSize: 14,
                          paddingHorizontal: wp("2%"),
                        }}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 10,
                          fontFamily: "LouisGeorge",
                          paddingHorizontal: wp("2%"),
                        }}
                      >
                        {item.color.toUpperCase()}
                      </Text>
                      <Text
                        style={{
                          color: "gray",
                          fontSize: 10,
                          marginTop: 10,
                          fontFamily: "LouisGeorge",
                          paddingHorizontal: wp("2%"),
                        }}
                        numberOfLines={1}
                      >
                        {item.brand.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  inputsContainer: {},
  input: {
    backgroundColor: "lightgray",
    height: hp("4%"),
    borderRadius: 20,
    paddingLeft: 20,
    width: wp("80%"),
    fontFamily: "LouisGeorge",
  },

  titleContainer: {
    flexDirection: "row",
    height: hp("7%"),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  titleSearch: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: hp(2.5),
    textAlign: "left",
    color: "#FF7E00",
    fontWeight: "bold",
    paddingVertical: hp("2%"),
    fontFamily: "LouisGeorge",
    paddingHorizontal: 15,
  },

  searchContainer: {
    backgroundColor: "white",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",

    width: wp("100%"),
    height: hp("6%"),
  },
  clearBtnTxt: {
    fontFamily: "LouisGeorge",
    fontSize: 15,
  },
  clearButton: {
    backgroundColor: "whitesmoke",
    borderWidth: 1,
    borderColor: "#717171",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",

    width: wp("25%"),
    height: hp("4%"),
  },
});
