import { useState } from "react";
import { Text, View, TouchableOpacity, Image, Share } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from "react-native-btr";
import { styles } from "./FormItem.style";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import API_URL from "../../../url.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteForm } from "../../../redux/slices/dashboardSlice";

const FormItem = ({ formName, submissionInfo, formId }) => {
  const navigation = useNavigation();
  const userToken = useSelector((state) => state.userToken.token);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const navigateTo = (screen) => {
    navigation.navigate(`${screen}`, { formName, id: formId });
    toggleBottomNavigationView();
  };

  const _deleteForm = () => {
    console.log(formId);
    const url = `${API_URL.API_URL}/forms/${formId}`;

    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(deleteForm(formId));
      })
      .then(() => {
        toggleBottomNavigationView();
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://playpodo.vercel.app/?id=${formId}`,
      }).then(() => {
        // toggleBottomNavigationView();
      });
    } catch (error) {
      alert(error.message);
    }
  };

  // console.log(formId);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleBottomNavigationView}
    >
      <Image
        source={require("../../../assets/images/Icons/formIcon.png")}
        style={styles.formItemIcon}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.formName}>{formName}</Text>
        <Text style={styles.submissions}>
          {submissionInfo != 0
            ? `${submissionInfo} submissions`
            : "No submission yet."}
        </Text>
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View style={styles.sheetHeader}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Image
                source={require("../../../assets/images/Icons/formIcon.png")}
                style={styles.formIcon}
                resizeMode="contain"
              />
              <Text style={styles.sheetHeaderText}>{formName}</Text>
            </View>
            <TouchableOpacity onPress={toggleBottomNavigationView}>
              <Ionicons name="close-circle" size={35} color="#C8CEED" />
            </TouchableOpacity>
          </View>
          <View style={styles.sheetOptions}>
            <TouchableOpacity
              style={styles.sheetOptionsItem}
              onPress={() => {
                navigateTo("SubmissionListScreen");
              }}
            >
              <Ionicons name="mail" size={20} color="white" />
              <Text style={styles.sheetOptionsText}>Submissions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetOptionsItem}
              onPress={() => {
                navigateTo("form");
              }}
            >
              <MaterialCommunityIcons
                name="page-previous-outline"
                size={20}
                color="white"
              />
              <Text style={styles.sheetOptionsText}>Fill Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetOptionsItem}
              onPress={() => {
                navigateTo("FormEditScreen");
              }}
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={20}
                color="white"
              />
              <Text style={styles.sheetOptionsText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sheetOptionsItem} onPress={onShare}>
              <MaterialCommunityIcons name="share" size={20} color="white" />
              <Text style={styles.sheetOptionsText}>Publish</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetOptionsItem}
              onPress={_deleteForm}
            >
              <MaterialCommunityIcons name="delete" size={20} color="#FF4948" />
              <Text style={[styles.sheetOptionsText, { color: "#FF4948" }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </TouchableOpacity>
  );
};

export default FormItem;
