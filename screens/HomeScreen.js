import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import FormItem from "../components/Home/FormItem";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API_URL from "../url.json";
import { setFirstRender, setForms } from "../redux/slices/dashboardSlice";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function HomeScreen({ navigation }) {
  const userToken = useSelector((state) => state.userToken.token);
  const forms = useSelector((state) => state.dashboard.forms);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const firstRender = useSelector((state) => state.dashboard.firstRender);
  // const forms =[]
  // console.log(userToken);

  const renderItem = ({ item }) => (
    <FormItem
      formName={item.title}
      submissionInfo={item.answerNumber}
      formId={item.id}
    />
  );

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("../assets/images/emptyScreens/emptyHome.png")}
          style={styles.emptyHomeImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyText1}>YOU DON'T HAVE ANY FORMS YET!</Text>
        <Text style={styles.emptyText2}>Your forms will appear here.</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate("NewVideoaskStepsScreen")}
        >
          <Text style={styles.createButtonText}>CREATE FORM</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleUrl = (url) => {
    let data = Linking.parse(url);
    console.log(data);
    const path = data.path;
    const queryParams = data.queryParams;
    if (path == "form") {
      navigation.navigate("form", { id: queryParams.id });
    }
  };

  useEffect(() => {
    Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    if (!userToken) {
      navigation.replace("OnboardingScreen");
      if (!firstRender) {
        Linking.getInitialURL()
          .then((url) => handleUrl(url))
          .then(() => {
            dispatch(setFirstRender(true));
          });
      }
    } else {
      fetchForms();
    }

    // return () => {
    //   subscription.remove("url");
    // };
  }, []);

  const fetchForms = () => {
    // setLoading(false);
    const response = axios({
      method: "get",
      url: `${API_URL.API_URL}/forms/dashboard`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      // console.log(response.data);
      // setData(response.data.forms);

      dispatch(setForms(response.data.forms));
      setLoading(false);
    });
  };

  const notSignIn = () => {
    return (
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: width * 0.5, height: width * 0.5 }}
        />
        <Text style={styles.logoText}>PlayPodo</Text>
      </View>
    );
  };

  if (!userToken) {
    return notSignIn();
  } else {
    if (isLoading) {
      return (
        <View
          style={[
            styles.container,
            { backgroundColor: "white", justifyContent: "center" },
          ]}
        >
          <StatusBar style="light" />
          <ActivityIndicator size="large" color="#252D5B" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar style="light" />
          {forms.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("NewVideoaskStepsScreen", {
                  cameFrom: "HomeScreen",
                })
              }
              style={styles.newVideoaskButton}
            >
              <Entypo name="plus" size={32} color="white" />
            </TouchableOpacity>
          )}

          <FlatList
            ListEmptyComponent={<EmptyComponent />}
            data={forms}
            renderItem={renderItem}
            keyExtractor={(item) => forms.indexOf(item)}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: "center",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginVertical: 14,
  },
  profilePic: {
    width: width / 8,
    height: width / 8,
    borderRadius: 100,
  },
  newVideoaskButton: {
    width: 56,
    height: 56,
    borderRadius: 100,
    backgroundColor: "#FF6100",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 24,
    bottom: 24,
    zIndex: 10,
  },
  newVideoaskButtonText: {
    fontSize: 40,
    color: "white",
  },
  emptyContainer: {
    flex: 1,
    height: height - 80,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyHomeImage: {
    height: 200,
    width,
  },
  emptyText1: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0A1551",
    marginTop: 10,
  },
  emptyText2: {
    color: "#6F76A7",
    fontSize: 15,
    marginTop: 15,
  },
  createButton: {
    padding: 10,
    marginTop: 15,
    backgroundColor: "#FF6100",
    borderRadius: 5,
    paddingHorizontal: 80,
  },
  createButtonText: {
    color: "white",
    fontSize: 17,
  },
});
