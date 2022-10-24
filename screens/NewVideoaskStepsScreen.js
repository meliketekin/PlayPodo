import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import CompletedVideoStepCard from "../components/CompletedVideoStepCard/CompletedVideoStepCard";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFormId } from "../redux/slices/stepSlice";
import API_URL from "../url.json";
import { addForm } from "../redux/slices/dashboardSlice";

export default function NewVideoaskOptionsScreen(props) {
  const [videos, setVideos] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.userToken.token);

  const renderItem = ({ item, index }) => (
    <CompletedVideoStepCard videoUrl={item.videoUrl} index={index + 1} />
  );

  const createForm = async () => {
    const url = `${API_URL.API_URL}/forms/`;

    await axios
      .post(
        url,
        {
          askForUserInfo: false,
          title: formTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        const id = res.data.form.createdForm._id;
        dispatch(setFormId(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddStepButton = () => {
    return (
      <TouchableOpacity
        style={styles.addStepButton}
        onPress={() => {
          if (formTitle.length > 2) {
            createForm();
            navigation.navigate("NewVideoaskScreen");
          } else {
            setIsEditable(true);
          }
        }}
      >
        <Entypo name="plus" size={50} color="#04092D" />
        <Text style={styles.addStepButtonText}>Create form</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="#D9D9D9" />
        </TouchableOpacity>

        {!isEditable && <Text style={styles.formTitleText}>Form Title</Text>}
        {isEditable && (
          <TextInput
            style={styles.formTitleTextInput}
            placeholder="Form Title"
            placeholderTextColor="gray"
            value={formTitle}
            onChangeText={(text) => {
              setFormTitle(text);
            }}
            autoFocus={true}
          />
        )}
        {!isEditable && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditable(true)}
          >
            <Feather name="edit" size={25} color="#D9D9D9" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={videos}
        renderItem={renderItem}
        ListFooterComponent={() => <AddStepButton />}
        style={styles.flatList}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252D5B",
  },
  header: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 10,
    right: 0,
    width: 30,
  },
  formTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 40,
    color: "#D9D9D9",
  },
  formTitleTextInput: {
    width: 150,
    fontSize: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",
    paddingHorizontal: 10,
    color: "#D9D9D9",
    textAlign: "center",
  },
  flatList: {
    padding: 15,
    marginTop: 100,
  },
  addStepButton: {
    width: 120,
    height: 120,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 6,
  },
  addStepButtonText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  editButton: {
    marginLeft: 20,
  },
});
