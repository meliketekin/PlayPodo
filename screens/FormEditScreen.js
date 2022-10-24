import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import CompletedVideoStepCard from "../components/CompletedVideoStepCard/CompletedVideoStepCard";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFormId } from "../redux/slices/stepSlice";
import API_URL from "../url.json";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function FormEditScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = route.params;
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState("");
  const userToken = useSelector((state) => state.userToken.token);
  const [isLoading, setLoading] = useState(false);

  console.log(id);

  // console.log(data.videUrl);

  const renderItem = ({ item, index }) => (
    <CompletedVideoStepCard
      videoUrl={item.videoLink}
      index={index + 1}
      stepId={item._id}
      formId={id}
    />
  );

  const getForm = async () => {
    setLoading(true);
    const url = `${API_URL.API_URL}/forms/${id}`;

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setTitle(res.data.form.title);
        setSteps(res.data.form.steps);
        setLoading(false)
        
      });
  };

  useEffect(() => {
    getForm();
    
  }, []);

  const AddStepButton = () => {
    return (
      <TouchableOpacity
        style={styles.addStepButton}
        onPress={() => {
          dispatch(setFormId(id));
          navigation.navigate("NewVideoaskScreen", { formId: id });
        }}
      >
        <Entypo name="plus" size={50} color="black" />
        <Text style={styles.addStepButtonText}>Add a question</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] })
          }
        >
          <Ionicons name="chevron-back" size={30} color="#D9D9D9" />
        </TouchableOpacity>

        <Text style={styles.newVideoaskText}>{title}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit" size={25} color="#D9D9D9" />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View
          style={[
            styles.container,
            {justifyContent: "center" },
          ]}
        >
          <StatusBar style="light" />
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          data={steps}
          renderItem={renderItem}
          ListFooterComponent={() => <AddStepButton />}
          style={styles.flatList}
        />
      )}
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
  newVideoaskText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 40,
    color: "#D9D9D9",
  },
  editButton: {
    marginLeft: 20,
  },
  flatList: {
    padding: 15,
    marginTop: 40,
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
});
