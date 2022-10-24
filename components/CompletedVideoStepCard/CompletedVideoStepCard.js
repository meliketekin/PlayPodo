import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./CompletedVideoStepCard.styles";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import API_URL from "../../url.json";
import { useSelector } from "react-redux";

export default function CompletedVideoStepCard({
  videoUrl,
  index,
  stepId,
  formId,
}) {
  const previewVideo = React.useRef(null);
  const navigation = useNavigation();
  const userToken = useSelector((state) => state.userToken.token);

  console.log(videoUrl, index, stepId);

  const deleteStep = async () => {
    const url = `${API_URL.API_URL}/forms/${formId}/${stepId}`;
    try {
      axios
        .delete(url, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          navigation.replace("FormEditScreen", { id: formId });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addStepButton}
        onPress={() =>
          navigation.navigate("VideoaskPreviewScreen", { source: videoUrl, cameFrom: "CompletedVideoStepCard" })
        }
      >
        <Video
          ref={previewVideo}
          style={styles.video}
          source={{ uri: videoUrl }}
          resizeMode="cover"
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
            position: "absolute",
            left: 10,
            top: 10,
          }}
        >
          {index}
        </Text>
        <TouchableOpacity onPress={deleteStep} style={styles.deleteIcon}>
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
      <Ionicons
        name="ellipsis-vertical"
        size={30}
        color="gray"
        style={{ alignSelf: "center" }}
      />
    </View>
  );
}
