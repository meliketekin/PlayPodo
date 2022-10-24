import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";

export default function SubmissionDetailScreen({ route, navigation }) {
  const { answers, name, email, saveTime } = route.params;

  console.log(answers);

  const date = moment(saveTime).toLocaleString();

  const temp = date.split(":");
  const submissionDate = temp[0] + ":" + temp[1];

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.row}>
      <Text style={styles.label}>Question {index + 1}</Text>
      <Text style={styles.answer}>{item.choice}</Text>
      {/* {console.log(item, index)} */}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Submission Date</Text>
        <Text style={styles.info}>{submissionDate}</Text>
      </View>
      <FlatList
        data={answers}
        renderItem={renderItem}
        keyExtractor={(item) => answers.indexOf(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#43A6BB",
    height: 74,
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
  userInfo: {
    width: "100%",
    paddingHorizontal: 12,
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  name: {
    fontSize: 17,
    paddingTop: 24,
  },
  email: {
    fontSize: 13,
    paddingTop: 12,
    paddingBottom: 24,
  },
  row: {
    marginHorizontal: 12,
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 1,
    paddingVertical: 8,
    justifyContent: "center",
  },
  label: {
    color: "gray",
    fontSize: 13,
    marginBottom: 4,
    paddingTop: 16,
  },
  info: {
    fontSize: 16,
    paddingBottom: 18,
    paddingTop: 12,
  },
  backButton: {
    marginTop: 6,
  },
  answer: {
    fontSize: 16,
    color: "#0099FF",
    paddingBottom: 18,
    paddingTop: 12,
  },
});
