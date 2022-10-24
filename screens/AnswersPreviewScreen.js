import axios from "axios";
import { StatusBar } from "expo-status-bar";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers } from "../redux/slices/answerSlice";
import API_URL from "../url.json";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AnswersPreviewScreen = ({ navigation, route }) => {
  const answers = useSelector((state) => state.answer.answers);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userToken = useSelector((state) => state.userToken.token);
  const formId = route.params.formId;
  const [isLoading, setIsLoading] = useState(false);
  // const answers = ["yes", "no"];

  console.log(route.params);

  // console.log(answers, formId);

  const onSubmit = async () => {
    const url = `${API_URL.API_URL}/answers/${formId}`;
    if (name != "" && email != "") {
      setIsLoading(true);
      await axios
        .post(url)
        .then((res) => {
          // console.log(res.data.answer._id);
          const id = res.data.answer._id;
          saveAnswers(id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const saveAnswers = async (id) => {
    // console.log(id);
    const url = `${API_URL.API_URL}/answers/choice/${id}`;

    const response = axios({
      method: "post",
      url,
      data: {
        choices: answers,
      },
    })
      .then((res) => {
        console.log(res);
        saveUserInfo(id);
        dispatch(clearAnswers());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveUserInfo = async (id) => {
    const url = `${API_URL.API_URL}/answers/userInfo/${id}`;
    const response = axios({
      method: "post",
      url,
      data: {
        name,
        email,
      },
    })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        // Linking.openURL(`exp://j8-wx8.anonymous.mobile.exp.direct/`);
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const answer = ({ index, item }) => {
    return (
      <View style={[styles.choiceContainer]}>
        <Text style={styles.choiceIndex}>Question {index + 1}</Text>
        <Text style={styles.choiceText}>{item}</Text>
      </View>
    );
  };

  const collectUserInfo = () => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="name.."
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email.."
          style={styles.emailInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
    );
  };

  useEffect(() => {
    if (userToken) {
      setName(jwtDecode(userToken).name);
      setEmail(jwtDecode(userToken).email);
    }
  }, []);

  const date = moment().toLocaleString();

  const temp = date.split(":");
  const submissionDate = temp[0] + ":" + temp[1];

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        {userToken ? (
          <View style={styles.userContainer}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
          </View>
        ) : (
          collectUserInfo()
        )}
        <View style={styles.dateContainer}>
          <Text style={styles.choiceIndex}>Submission Date</Text>
          <Text style={{ fontSize: 18, marginTop: 12 }}>{submissionDate}</Text>
        </View>
        <FlatList
          data={answers}
          renderItem={answer}
          keyExtractor={(index) => index.toString()}
          style={styles.answerList}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.submit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
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
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white",
  },
  dateContainer: {
    marginHorizontal: 16,
    paddingTop: 16,
    borderBottomColor: "#f3f3fe",
    borderBottomWidth: 1,
    paddingBottom: 18,
  },
  choiceContainer: {
    paddingVertical: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3FE",
  },
  choiceIndex: {
    fontSize: 14,
    color: "#6F76A7",
  },
  choiceText: {
    fontSize: 18,
    color: "#0099FF",
    marginTop: 12,
  },
  userContainer: {
    width: "100%",
    paddingBottom: 24,
    borderBottomColor: "#F3F3FE",
    borderBottomWidth: 1,
    marginTop: 16,
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  name: {
    fontSize: 18,
    marginBottom: 12,
  },
  email: {
    fontSize: 16,
  },
  answerList: {
    // marginTop: 30,
  },
  submit: {
    borderRadius: 5,
    backgroundColor: "#FF6100",
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 15,
    width: width * 0.5,
  },
  submitText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    paddingBottom: 20,
    borderBottomColor: "#F3F3FE",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  emailInput: {
    borderWidth: 2,
    marginHorizontal: 16,
    height: 38,
    paddingLeft: 20,
    borderColor: "#C8CEED",
    borderRadius: 5,
    marginTop: 10,
  },
  nameInput: {
    borderWidth: 2,
    marginHorizontal: 16,
    height: 38,
    paddingLeft: 20,
    borderColor: "#C8CEED",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
  },
});

export default AnswersPreviewScreen;
