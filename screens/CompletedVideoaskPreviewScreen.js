import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  FlatList,
} from "react-native";
import React from "react";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { FileSystemUploadType } from "expo-file-system";
import { clearStep } from "../redux/slices/stepSlice";
import API_URL from "../url.json";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

//https://1761-139-179-202-18.ngrok.io/

export default function CompletedVideoaskPreviewScreen(props) {
  const navigation = useNavigation();
  const previewVideo = React.useRef(null);
  const dispatch = useDispatch();
  const step = useSelector((state) => state.step);
  const formId = useSelector((state) => state.step.formId);
  const userToken = useSelector((state) => state.userToken.token);

  console.log(step);

  const renderItem = ({ item, index }) => (
    <SingleChoice index={index} item={item} />
  );

  const saveStep = async () => {
    // console.log(video);
    const url = `${API_URL.API_URL}/forms/${formId}`;
    // console.log(formId);
    const headersUpload = {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data",
    };

    FileSystem.uploadAsync(url, step.videoUrl, {
      headers: headersUpload,
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: "file",
      mimeType: "video/mp4",
      parameters: {
        choices: `${step.choices}`,
        answerable: true,
        choiceNumber: 1,
        text: "New Form",
        type: "video",
      },
    })
      .then((res) => {
        console.log(res);
        navigation.reset({
          index: 0,
          routes: [{ name: "FormEditScreen", params: { id: formId } }],
        });
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: "HomeScreen" }],
        // });
      })
      .then(() => {
        // dispatch(clearStep());
      });
  };

  const SingleChoice = ({ index, item }) => {
    return (
      <TouchableOpacity style={styles.choiceContainer}>
        <Text style={styles.choiceIndex}>{index + 1}</Text>
        <Text style={styles.choiceText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const data = step.choices;

  return (
    <View style={styles.container}>
      <Video
        ref={previewVideo}
        style={styles.video}
        source={{
          uri: step.videoUrl,
        }}
        resizeMode="contain"
        // isLooping={true}
        shouldPlay
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={35} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.doneButton} onPress={saveStep}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        style={styles.choiceList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    flex: 1,
    width,
    height,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "gray",
    backgroundColor: "gray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  choiceContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    height: 50,
    width: width - 40,
    alignSelf: "center",
    marginBottom: 10,

    alignItems: "center",
  },
  choiceIndex: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
  choiceText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  doneButton: {
    marginRight: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    top: 30,
    right: 5,
  },
  doneText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  choiceList: {
    alignSelf: "center",
    width: width - 40,
    position: "absolute",
    bottom: 20,
  },
});
