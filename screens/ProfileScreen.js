import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../redux/slices/tokenSlice";
import { clearForms } from "../redux/slices/dashboardSlice";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userToken.token);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (userToken) {
      setUserInfo(jwt_decode(userToken));
    }
  }, []);

  function signOut() {
    // token state silincek
    dispatch(removeToken());
    dispatch(clearForms());
    navigation.reset({
      index: 0,
      routes: [{ name: "OnboardingScreen" }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePicContainer}>
          <Image
            style={styles.profilePic}
            source={{
              uri: "https://cdn.jotfor.ms/assets/img/v4/avatar/Podo-Avatar2-03.png?ssl=1",
            }}
          ></Image>
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.labelContainer}>
          <Text style={styles.nameLabel}>Name</Text>
          <Text style={styles.emailLabel}>Email</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{userInfo?.name}</Text>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.email}>{userInfo?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.editContainer}>
        <TouchableOpacity style={styles.changePasswordContainer}>
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAccountContainer}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={{ color: "red", textAlign: "center", fontSize: 16 }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    // marginHorizontal: 20,
    backgroundColor: "white",
    width: "100%",
    height: height / 4,
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    alignSelf: "center",
  },
  profilePicContainer: {
    width: 112,
    height: 112,
    backgroundColor: "#091141",
    borderRadius: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 106,
    height: 106,
    borderRadius: 53,
    alignSelf: "center",
  },
  userInfo: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: "row",
  },
  infoContainer: {
    marginLeft: 24,
    width: "80%",
  },
  nameLabel: {
    paddingBottom: 11,
  },
  emailLabel: {
    paddingTop: 11,
  },
  nameContainer: {
    paddingBottom: 11,
    borderBottomColor: "#f3f3f3",
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 16,
    color: "#6F76A7",
  },
  emailContainer: {
    paddingTop: 11,
  },
  email: {
    fontSize: 16,
    color: "#6F76A7",
  },
  editContainer: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  changePasswordContainer: {
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  deleteAccountContainer: {
    paddingTop: 11,
  },
  changePasswordText: {
    fontSize: 16,
  },
  deleteAccountText: {
    fontSize: 16,
  },
  signOut: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
});
