import * as React from "react";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { LogBox } from "react-native";
import SkansCategory from "../components/SkansCategory";
import LikesCategory from "../components/LikesCategory";
import FavoritesCategory from "../components/FavoritesCategory";
LogBox.ignoreLogs(["Sending..."]);

const FavoritesCategoryRoute = () => (
  <View style={{ flex: 1 }}>{<FavoritesCategory />}</View>
);

const LikesCategoryRoute = () => (
  <View style={{ flex: 1 }}>{<LikesCategory />}</View>
);
const SkansCategoryRoute = () => (
  <View style={{ flex: 1 }}>
    <SkansCategory />
  </View>
);

const renderScene = SceneMap({
  favorites: FavoritesCategoryRoute,
  likes: LikesCategoryRoute,
  skans: SkansCategoryRoute,
});

const CollectionScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "favorites", title: "MES FAVORIS" },
    { key: "skans", title: "MES SKANS" },
    { key: "likes", title: "MES LIKES" },
  ]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      activeColor={"white"}
      inactiveColor={"black"}
      swipeEnabled={true}
      selectedTabTextColor={"green"}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.navigatorSelector}
          style={styles.navigatorBackground}
          renderLabel={({ route }) => (
            <Text style={styles.text}>{route.title}</Text>
          )}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({
  text: {
    color: "black",
    fontFamily: "LouisGeorgeBoldItalic",
    fontSize: 15,
  },
  navigatorBackground: { backgroundColor: "white" },
  navigatorSelector: { backgroundColor: "#FF7E00" },
});

export default CollectionScreen;
