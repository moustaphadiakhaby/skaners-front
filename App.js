import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import SignInScreen from "./containers/SignInScreen";
import CreateUserAccountScreen from "./containers/CreateUserAccountScreen";
import FinalizeUserAccountScreen from "./containers/FinalizeUserAccountScreen";
import ChooseUserAvatarScreen from "./containers/ChooseUserAvatarScreen";
import SplashScreen from "./containers/SplashScreen";
import WelcomeScreen from "./containers/WelcomeScreen";
import SearchScreen from "./containers/SearchScreen";
import CameraScreen from "./containers/CameraScreen";
import CollectionScreen from "./containers/CollectionScreen";
import CopDropScreen from "./containers/CopDropScreen";
import SkansCheckScreen from "./containers/SkansCheckScreen";
import SingleSkanScreen from "./containers/SingleSkanScreen";
import UpdateProfileScreen from "./containers/UpdateProfileScreen";
import ProfileScreen from "./containers/ProfileScreen";
import ProfileButton from "./components/ProfileButton";
import PictureHomeView from "./components/PictureHomeView";
import { useFonts } from "expo-font";
import ProductCardSkanScreen from "./containers/ProductCardSkanScreen";
import { Image, StyleSheet, Platform } from "react-native";
import ProductScreen from "./containers/ProductScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    LouisGeorge: require("./assets/fonts/louis_george_caf/LouisGeorgeCafe.ttf"),
    LouisGeorgeBold: require("./assets/fonts/louis_george_caf/LouisGeorgeCafeBold.ttf"),
    LouisGeorgeBoldItalic: require("./assets/fonts/louis_george_caf/LouisGeorgeCafeBoldItalic.ttf"),
    LouisGeorgeItalic: require("./assets/fonts/louis_george_caf/LouisGeorgeCafeItalic.ttf"),
    LouisGeorgeLight: require("./assets/fonts/louis_george_caf/LouisGeorgeCafeLight.ttf"),
    LouisGeorgeLightItalic: require("./assets/fonts/louis_george_caf/LouisGeorgeCafeLightItalic.ttf"),
    LemonMilk: require("./assets/fonts/lemon_milk/LEMONMILK-Regular.otf"),
    LemonMilkMedium: require("./assets/fonts/lemon_milk/LEMONMILK-Medium.otf"),
    LemonMilkBold: require("./assets/fonts/lemon_milk/LEMONMILK-Bold.otf"),
  });

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (!loaded) {
    return null;
  }

  if (isLoading === true) {
    return null;
  }

  const styles = StyleSheet.create({
    navLogo: {
      height: 40,
      marginHorizontal: 10,
      width: 150,
      resizeMode: "contain",
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          contentStyle: {
            borderTopColor: "#717171",
            borderTopWidth: 1,
          },
          headerTintColor: "black",
        }}
      >
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen
              name="Welcome"
              options={{
                headerShown: false,
              }}
            >
              {() => <WelcomeScreen />}
            </Stack.Screen>

            <Stack.Screen
              name="Create User Account"
              options={{
                title: "",
                headerRight: () => {
                  return (
                    <Image
                      style={styles.navLogo}
                      source={require("./assets/Images/navLogo.png")}
                    />
                  );
                },
              }}
            >
              {(props) => <CreateUserAccountScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
              options={{
                title: "",
                headerRight: () => {
                  return (
                    <Image
                      style={styles.navLogo}
                      source={require("./assets/Images/navLogo.png")}
                    />
                  );
                },
              }}
              name="Finalize User Account"
            >
              {(props) => <FinalizeUserAccountScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
              options={{
                title: "",
                headerRight: () => {
                  return (
                    <Image
                      style={styles.navLogo}
                      source={require("./assets/Images/navLogo.png")}
                    />
                  );
                },
              }}
              name="Choose Avatar"
            >
              {(props) => (
                <ChooseUserAvatarScreen setToken={setToken} {...props} />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="SignIn"
              options={{
                title: "",
                headerRight: () => {
                  return (
                    <Image
                      style={styles.navLogo}
                      source={require("./assets/Images/navLogo.png")}
                    />
                  );
                },
              }}
            >
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <>
            <Stack.Screen name="Splash" options={{ headerShown: false }}>
              {() => <SplashScreen />}
            </Stack.Screen>
            <Stack.Screen name="Tab" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator
                  screenOptions={{
                    headerShown: false,

                    tabBarItemStyle: {
                      height: Platform.OS === "ios" ? 70 : 80,
                    },
                    tabBarStyle: {
                      height: Platform.OS === "ios" ? 60 : 70,
                      paddingBottom: Platform.OS === "ios" ? 75 : 0,
                      backgroundColor: "white",
                    },
                    tabBarActiveTintColor: "#FF7E00",
                    tabBarInactiveTintColor: "black",
                  }}
                >
                  <Tab.Screen
                    name="TabHome"
                    options={{
                      headerShown: false,
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name={"ios-home"} size={30} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator
                        screenOptions={{
                          headerStyle: styles.header,
                          contentStyle: {
                            borderTopColor: "#717171",
                            borderTopWidth: 1,
                          },
                          headerTintColor: "black",
                        }}
                      >
                        <Stack.Screen
                          name="Home"
                          options={{
                            title: "",
                            headerLeft: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                            headerRight: () => {
                              return <ProfileButton />;
                            },
                          }}
                        >
                          {(props) => <HomeScreen {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="HomeView"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => (
                            <PictureHomeView token={userToken} {...props} />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          name="ProductCardSkanScreen"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => <ProductCardSkanScreen {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="Profile"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => (
                            <ProfileScreen {...props} setToken={setToken} />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          name="UpdateProfile"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => <UpdateProfileScreen {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="SkansCheck"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => (
                            <SkansCheckScreen token={userToken} {...props} />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          name="SingleSkan"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => <SingleSkanScreen {...props} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="TabSearch"
                    options={{
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons
                          name={"search-sharp"}
                          size={35}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator
                        screenOptions={{
                          headerStyle: styles.header,
                          contentStyle: {
                            borderTopColor: "#717171",
                            borderTopWidth: 1,
                          },
                          headerTintColor: "black",
                        }}
                      >
                        <Stack.Screen
                          name="Search"
                          options={{
                            title: "",
                            headerLeft: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => <SearchScreen {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="ProductScreen"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => (
                            <ProductScreen token={userToken} {...props} />
                          )}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  <Tab.Screen
                    name="TabCamera"
                    options={{
                      tabBarLabel: "",
                      tabBarStyle: { display: "none" },
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons name="aperture" size={55} color={"#FF7E00"} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Camera"
                          options={{ headerShown: false }}
                        >
                          {(props) => <CameraScreen {...props} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="TabCollection"
                    options={{
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                          name="favorite"
                          size={35}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator
                        screenOptions={{
                          headerStyle: styles.header,
                          contentStyle: {
                            borderTopColor: "#717171",
                            borderTopWidth: 1,
                          },
                          headerTintColor: "black",
                        }}
                      >
                        <Stack.Screen
                          name="Collection"
                          options={{
                            title: "",
                            headerLeft: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => <CollectionScreen {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="ProductCardSkanScreen"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => <ProductCardSkanScreen {...props} />}
                        </Stack.Screen>
                        <Stack.Screen
                          name="ProductCardLikeScreen"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => (
                            <PictureHomeView token={userToken} {...props} />
                          )}
                        </Stack.Screen>
                        <Stack.Screen
                          name="ProductScreen"
                          options={{
                            title: "",
                            headerRight: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => (
                            <ProductScreen token={userToken} {...props} />
                          )}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                  <Tab.Screen
                    name="TabCopDrop"
                    options={{
                      tabBarLabel: "",
                      tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                          name="inventory"
                          size={30}
                          color={color}
                        />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator
                        screenOptions={{
                          headerStyle: styles.header,
                          contentStyle: {
                            borderTopColor: "#717171",
                            borderTopWidth: 1,
                          },
                          headerTintColor: "black",
                        }}
                      >
                        <Stack.Screen
                          name="CopDrop"
                          options={{
                            title: "",
                            headerLeft: () => {
                              return (
                                <Image
                                  style={styles.navLogo}
                                  source={require("./assets/Images/navLogo.png")}
                                />
                              );
                            },
                          }}
                        >
                          {(props) => (
                            <CopDropScreen {...props} token={userToken} />
                          )}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
