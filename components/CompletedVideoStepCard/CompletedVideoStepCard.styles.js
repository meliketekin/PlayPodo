import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  addStepButton: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 6,
  },
  video: {
    width: "100%",
    height: "100%",
    flex: 1,
    borderRadius: 15,
  },
  deleteIcon: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    position: "absolute",
    right: 10,
    top: 10,
  },
});
