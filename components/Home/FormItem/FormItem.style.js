import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  infoContainer: {
    marginLeft: "5%",
  },
  formName: {
    fontSize: 20,
    fontWeight:"bold"
  },
  submissions: {
    fontSize: 16,
    color: "gray",
  },
  bottomNavigationView: {
    backgroundColor: "#252D5B",
    width: "100%",
    height: 340,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  sheetHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#343C6A",
    width: "100%",
    padding: 8,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetHeaderText: {
    fontSize: 22,
    marginLeft: 17,
    color: "white",
  },
  sheetOptions: {
    alignItems: "flex-start",
    marginHorizontal: 8,
  },
  sheetOptionsItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    marginLeft:10
  },
  sheetOptionsText: {
    fontSize: 17,
    marginLeft: 16,
    color: "white",
  },
  formIcon: {
    width:18
  },
  formItemIcon: {
    width: 30,
    height:35
  }
});
