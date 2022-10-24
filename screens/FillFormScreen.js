import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Device from "expo-device";
import * as Linking from "expo-linking";
import axios from "axios";
import API_URL from "../url.json";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { setAnswers } from "../redux/slices/answerSlice";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const FillFormScreen = ({ navigation, route }) => {
  const video = React.useRef(null);
  const [visibleChoices, setVisibleChoices] = useState(false);
  const [visiblePlayButton, setVisiblePlayButton] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [answerType, setAnswerType] = useState("");

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const getForm = () => {
    const response = axios({
      method: "get",
      url: `${API_URL.API_URL}/forms/${route.params.id}`,
    }).then((response) => {
      setData(response.data.form.steps);
      // console.log(response.data.form.title);
      setTitle(response.data.form.title);
    });
  };

  console.log(data);

  useEffect(() => {
    getForm();
  }, []);

  const renderItem = ({ item, index }) => (
    <SingleChoice index={index} item={item} />
  );

  const SingleChoice = ({ index, item }) => {
    const [isChosen, setIsChosen] = useState(false);
    const choose = (item) => {
      // console.log(item);
      setIsChosen(true);
      dispatch(setAnswers(item));
      setCurrentStepIndex(currentStepIndex + 1);
      setAnswerType("");

      if (currentStepIndex === data.length - 1) {
        navigation.navigate("AnswersPreviewScreen", {
          formId: route.params.id,
          formName: route.params.formName,
        });
      }

      setIsChosen(false);
      setVisibleChoices(false);
      setVisiblePlayButton(false);
      // setChosen(item);
      // console.log(chosen);

      // steps arrayinden kontrol et sonuncuda answers preview ekranına gönder
      // navigation.replace("form", {
      //   videoLink: data.videoLink,
      //   choices: data.choices,
      // });
      //navigate to next video, setIsChosen to false, setChosen to null, visibleChoices to false, visiblePlayButton to false
    };
    // console.log(item, index);
    return (
      <TouchableOpacity
        style={[
          styles.choiceContainer,
          { backgroundColor: isChosen ? "green" : "#04092D" },
        ]}
        onPress={() => {
          choose(item);
        }}
        disabled={isChosen}
      >
        <Text style={styles.choiceText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const AnswerTypeButtons = () => {
    const [_text, setText] = useState("");

    if (answerType === "") {
      return (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              setAnswerType("MultipleChoice");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Multiple Choice</Text>
            <Feather name="list" size={30} color="#C8CEED" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAnswerType("Text");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Text</Text>
            <Ionicons name="text" size={30} color="#C8CEED" />
          </TouchableOpacity>
        </View>
      );
    } else if (answerType === "MultipleChoice") {
      return (
        <FlatList
          data={data[currentStepIndex]?.choices}
          renderItem={renderItem}
          keyExtractor={(item) => data[currentStepIndex]?.choices.indexOf(item)}
          style={styles.choiceList}
        />
      );
    } else if (answerType === "Text") {
      return (
        <KeyboardAvoidingView behavior="position" style={{ zIndex: 10 }}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.choiceTextInput}
              placeholder="type here"
              placeholderTextColor="gray"
              multiline={true}
              value={_text}
              onChangeText={setText}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                dispatch(setAnswers(_text));
                setCurrentStepIndex(currentStepIndex + 1);
                setAnswerType("");

                if (currentStepIndex === data.length - 1) {
                  navigation.navigate("AnswersPreviewScreen", {
                    formId: route.params.id,
                    formName: route.params.formName,
                  });
                }

                setVisibleChoices(false);
                setVisiblePlayButton(false);
              }}
            >
              <MaterialIcons name="done" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
    // console.log(_text);
  };

  // console.log(_text);

  console.log(route.params);
  if (data === null) {
    return <Text>Loading</Text>;
  } else {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              position: "absolute",
              top: 32,
              left: 20,
              zIndex: 10,
            }}
          >
            <Text style={{ color: "#efefef", fontSize: 32 }}>
              {title} - {currentStepIndex + 1}
            </Text>
          </View>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: data[currentStepIndex]?.videoLink,
            }}
            resizeMode="cover"
            // isLooping={true}
            shouldPlay
            onPlaybackStatusUpdate={(playbackStatus) => {
              if (playbackStatus.didJustFinish) {
                setVisiblePlayButton(true);
                setVisibleChoices(true);
              }
            }}
          />
          {visibleChoices ? <AnswerTypeButtons /> : <></>}

          {visiblePlayButton && (
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => {
                video.current.replayAsync();
                setVisiblePlayButton(false);
              }}
            >
              <Ionicons name="play-circle" size={80} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  video: {
    alignSelf: "center",
    flex: 1,
    width,
    height,
  },
  buttonsContainer: {
    position: "absolute",
    width: "100%",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    width: width / 3 - 20,
    backgroundColor: "#04092D",
    height: width / 3 - 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "column-reverse",
  },
  doneButton: {
    backgroundColor: "green",
    borderRadius: 24,
    padding: 4,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  textContainer: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#04092D",
    borderRadius: 12,
    minHeight: 50,
    height: "auto",
    width: 300,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  choiceTextInput: {
    marginLeft: 10,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    width: "80%",
  },
  choiceContainer: {
    padding: 10,
    alignSelf: "center",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#04092D",
    borderRadius: 35,
    height: 50,
    width: 330,
    marginHorizontal: 30,
  },
  playButton: {
    position: "absolute",
    top: height / 2 - 40,
    left: width / 2 - 40,
  },
  choiceList: {
    alignSelf: "center",
    width: width - 40,
    position: "absolute",
    bottom: 20,
  },
  choiceIndex: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    marginLeft: 10,
  },
  choiceText: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 18,
    width: "100%",
    fontWeight: "500",
  },
});

export default FillFormScreen;
