import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, TouchableOpacity } from "react-native";

const ProfileButton = () => {
  const navigation = useNavigation();
  const [userPfp, setUserPfp] = useState(null);
  useEffect(() => {
    const fetchPfp = async () => {
      const userPfp = await AsyncStorage.getItem("userPfp");
      setUserPfp(userPfp);
    };
    fetchPfp();
  }, []);

  return userPfp ? (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Profile");
      }}
    >
      <Image
        source={{ uri: userPfp }}
        style={{
          height: 40,
          width: 40,
          borderRadius: 50,
          borderWidth: 1,
          marginBottom: 3,
          borderColor: "#717171",
        }}
        resizeMode={"contain"}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        navigation.push("Profile");
      }}
    >
      <FontAwesome name="user" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ProfileButton;
