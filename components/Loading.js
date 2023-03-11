import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import shoe from "../assets/Json/shoesLoading.json";

const Loading = () => {
  const animation = useRef(null);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <LottieView
        ref={animation}
        autoPlay
        style={{
          width: 200,
          height: 200,
          backgroundColor: "white",
        }}
        source={shoe}
      />
    </View>
  );
};

export default Loading;
