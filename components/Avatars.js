import { TouchableHighlight, View, Image, StyleSheet } from "react-native";

export default function Avatar({ picture, setAvatar, avatar }) {
  return (
    <TouchableHighlight
      style={styles.btn}
      underlayColor={"orange"}
      onPress={() => {
        setAvatar(picture.url);
      }}
    >
      <View
        style={picture.url !== avatar ? styles.circle : styles.circleSelected}
      >
        <Image
          style={styles.avatar}
          resizeMode="contain"
          source={{ uri: picture.url }}
        />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 100,
  },
  circle: {
    backgroundColor: "lightgray",
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
  },

  circleSelected: {
    backgroundColor: "lightgray",
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "orange",
    borderStyle: "solid",
    borderWidth: 3,
  },

  btn: {
    borderRadius: 100,
    height: 100,
    width: 100,
    marginHorizontal: 15,
  },
});
