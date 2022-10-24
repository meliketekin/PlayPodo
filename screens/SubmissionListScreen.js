import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import SubmissionListItem from "../components/SubmissionList/SubmissionListItem";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../url.json";

const height = Dimensions.get("window").height;

export default function SubmissionListScreen({ route, navigation }) {
  const { formName, id } = route.params;
  const userToken = useSelector((state) => state.userToken.token);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // console.log(formId);

  // console.log(formName);

  // const data = new Array(20).fill({
  //   formUser: {
  //     name: "John Doe",
  //     email: "johndoe@example.com",
  //   },
  //   createdAt: "2022-07-28T10:42:41.976Z",
  //   steps: ["Yes", "No", "yes", "no", "yes", "no"],
  // });

  const getSubmissionList = () => {
    const response = axios({
      method: "get",
      url: `${API_URL.API_URL}/forms/${id}/submissions`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        setData(res.data.answers);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSubmissionList();
  }, []);

  const renderItem = ({ item }) => (
    <SubmissionListItem data={item} formName={formName} />
  );

  const emptyScreen = () => {
    return (
      <View style={styles.emptyInbox}>
        <Image
          source={require("../assets/images/inbox/inbox-empty.png")}
          style={styles.emptyInboxImage}
        />
        <Text style={styles.emptyInboxText}>
          YOU DON'T HAVE ANY SUBMISSIONS YET!
        </Text>
      </View>
    );
  };

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
        <View style={styles.listContainer}>
          <Text
            style={{
              fontSize: 13,
              paddingHorizontal: 16,
              marginVertical: 20,
              fontWeight: "400",
            }}
          >
            Inbox
          </Text>
          <FlatList
            ListEmptyComponent={emptyScreen}
            data={data.sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })}
            renderItem={renderItem}
            style={{ paddingHorizontal: 16 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#43A6BB",
    height: 74,
    // justifyContent: "center",
  },
  headerTextContainer: {
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    height: 54,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 14,
    color: "white",
    marginLeft: 18,
  },
  headerIcon: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 18,
    height: 18,
  },
  emptyInbox: {
    flex: 1,
    height: height - 240,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyInboxImage: {
    width: 106,
    height: 117,
    alignSelf: "center",
  },
  emptyInboxText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0A1551",
    textAlign: "center",
    marginTop: 16,
  },
  backButton: {
    marginTop: 6,
  },
});
