import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const FinalizeUserAccountScreen = ({ route }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [favoriteBrand, setFavoriteBrand] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const navigation = useNavigation();
  const accountInfos = {
    email: route.params.email,
    userName: route.params.userName,
    password: route.params.password,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: route.params.dateOfBirth,
    phoneNumber: phoneNumber,
    sex: sex,
    favoriteBrand: favoriteBrand,
    shoeSize: shoeSize,
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.finalizeContainer}>
        <View>
          <Text style={styles.title}>Finalise ton inscription !</Text>
        </View>
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.inputTitle}>Prénom</Text>
            <TextInput
              style={styles.inputWithTitle}
              placeholder="Michael"
              placeholderTextColor="#717171"
              onChangeText={(input) => {
                setFirstName(input);
              }}
              value={firstName}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Nom</Text>
            <TextInput
              style={styles.inputWithTitle}
              placeholder="Jordan"
              placeholderTextColor="#717171"
              onChangeText={(input) => {
                setLastName(input);
              }}
              value={lastName}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Numéro de téléphone</Text>
            <TextInput
              placeholder="07-XX-XX-XX-XX"
              placeholderTextColor="#717171"
              value={phoneNumber}
              style={styles.inputWithTitle}
              onChangeText={(input) => {
                setPhoneNumber(input);
              }}
            />
          </View>
          <View>
            <Text style={styles.inputTitle}>Sexe</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                placeholder={{
                  label: "Sélectionner",
                  value: null,
                }}
                style={{
                  placeholder: {
                    color: "#717171",
                  },
                }}
                onValueChange={(value) => setSex(value)}
                items={[
                  { key: "M", label: "Masculin", value: "Masculin" },
                  { key: "F", label: "Féminin", value: "Féminin" },
                  { key: "Autre", label: "Autre", value: "Autre" },
                ]}
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputTitle}>Marque(s) favorite(s)</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                placeholder={{
                  label: "Sélectionner",
                  value: null,
                }}
                style={{
                  placeholder: {
                    color: "#717171",
                  },
                }}
                onValueChange={(value) => setFavoriteBrand(value)}
                items={[
                  { key: "0", label: "Nike", value: "Nike" },
                  { key: "1", label: "Adidas", value: "Adidas" },
                  { key: "2", label: "Jordan", value: "Jordan" },
                  { key: "3", label: "Reebok", value: "Reebok" },
                  { key: "4", label: "Gucci", value: "Gucci" },
                  { key: "5", label: "Vans", value: "Vans" },
                  { key: "6", label: "Converse", value: "Converse" },
                  { key: "7", label: "New Balance", value: "New Balance" },
                  { key: "8", label: "Puma", value: "Puma" },
                ]}
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputTitle}>Pointure</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                placeholder={{
                  label: "Sélectionner",
                  value: null,
                }}
                style={{
                  placeholder: {
                    color: "#717171",
                  },
                }}
                onValueChange={(value) => setShoeSize(value)}
                items={[
                  { key: "0", label: "35", value: "35" },
                  { key: "1", label: "36", value: "36" },
                  { key: "2", label: "37", value: "37" },
                  { key: "3", label: "38", value: "38" },
                  { key: "4", label: "39", value: "39" },
                  { key: "5", label: "40", value: "40" },
                  { key: "6", label: "41", value: "41" },
                  { key: "7", label: "42", value: "42" },
                  { key: "8", label: "43", value: "43" },
                  { key: "9", label: "44", value: "44" },
                  { key: "10", label: "45", value: "45" },
                  { key: "11", label: "46", value: "46" },
                ]}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.outroTxt}>
            Passe à l'étape suivante pour devenir un crack !
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => {
              navigation.navigate("Choose Avatar", accountInfos);
            }}
          >
            <Text style={styles.signUpTxt}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FinalizeUserAccountScreen;

const styles = StyleSheet.create({
  finalizeContainer: {
    justifyContent: "space-around",
    height: hp("85%"),
  },
  notaBene: {
    fontFamily: "LouisGeorgeItalic",
    color: "grey",
    fontSize: 12,
    textAlign: "center",
  },

  inputWithTitle: {
    backgroundColor: "lightgray",
    height: 30,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingLeft: 10,
  },

  title: {
    fontSize: 28,
    paddingVertical: 20,
    textAlign: "center",
    color: "#FF7E00",
    paddingLeft: 15,
    fontFamily: "LouisGeorge",
  },
  formContainer: { justifyContent: "space-around" },
  pickerContainer: {
    backgroundColor: "lightgray",
    height: 30,
    justifyContent: "center",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    padding: Platform.OS === "ios" ? 10 : 0,
    color: "#717171",
  },
  inputTitle: {
    fontFamily: "LouisGeorge",
    marginHorizontal: 30,
    color: "gray",
    marginTop: 15,
    marginBottom: 3,
  },
  outroTxt: {
    fontFamily: "LouisGeorge",
    color: "#717171",
    fontSize: 20,
    paddingHorizontal: wp("6%"),
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  signUpBtn: {
    height: hp("5%"),
    width: wp("60%"),
    backgroundColor: "#FF7E00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },

  signUpTxt: {
    fontFamily: "LouisGeorgeBold",
    color: "white",
    fontSize: 23,
  },
});
