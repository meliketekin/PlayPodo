import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import AddMultipleChoiceCard from "../components/AddMultipleChoiceCard/AddMultipleChoiceCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addChoice, setChoice, deleteChoice } from "../redux/slices/stepSlice";

export default function AddMultipleChoiceScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const choices = useSelector((state) => state.step.choices);
  const step = useSelector((state) => state.step);

  console.log(step);

  const renderItem = ({ item, index }) => (
    <AddMultipleChoiceCard
      onChangeText={onChangeText}
      index={index}
      choice={choices[index]}
      deleteChoice={_deleteChoice}
    />
  );

  console.log(choices);

  const _addChoice = () => {
    dispatch(addChoice());
  };

  const onChangeText = (text, index) => {
    dispatch(setChoice({ text, index }));
  };

  const _deleteChoice = (index) => {
    dispatch(deleteChoice(index));
  };

  // const submit = () => {
  //   console.log(choices);
  // }

  const AddMultipleChoiceButton = () => {
    return (
      <View style={styles.addMultipleChoiceButtonContainer}>
        <TouchableOpacity
          style={styles.addMultipleChoiceButton}
          onPress={_addChoice}
        >
          <Ionicons name="add" size={30} color="black" />
          <Text style={styles.addMultipleChoiceButtonText}>Add Choice</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.profileText}>Add Multiple Choice</Text>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            navigation.navigate("CompletedVideoaskPreviewScreen");
            // submit()
          }}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={choices}
          renderItem={renderItem}
          ListFooterComponent={() => <AddMultipleChoiceButton />}
          style={styles.flatList}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 10,
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  addMultipleChoiceButtonContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  addMultipleChoiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  addMultipleChoiceButtonText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  flatList: {
    marginTop: 50,
  },
  doneButton: {
    marginRight: 20,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
  },
  doneText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  textInputContainer: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "darkblue",
    borderRadius: 35,
    height: 70,
    width: 300,
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
  choiceTextInput: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    width: "60%",
  },
  choiceIndex: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    marginLeft: 20,
  },
  trashIcon: {
    marginRight: 20,
  },
});
