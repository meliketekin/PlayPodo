import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#04092D",
    borderRadius: 35,
    height: 60,
    width: 300,

    marginHorizontal: 30,
  },
  choiceTextInput: {
    marginLeft: 10,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    width: "70%",
  },
  choiceIndex: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    marginLeft: 20,
  },
  deleteIcon: {
    position: "absolute",
    right: 10,
    top: -10,
  },
});
