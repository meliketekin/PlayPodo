import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "./AddMultipleChoiceCard.styles";
import { Ionicons } from "@expo/vector-icons";

export default function AddMultipleChoiceCard({
  index,
  onChangeText,
  deleteChoice,
  choice,
  isPreview,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.choiceIndex}>{index + 1}</Text>
      <TextInput
        style={styles.choiceTextInput}
        placeholder="Choice"
        placeholderTextColor="gray"
        value={choice}
        multiline={true}
        numberOfLines={1}
        onChangeText={(text) => {
          onChangeText(text, index);
        }}
        editable={!isPreview}
      />
      {!isPreview && (
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={() => deleteChoice(index)}
        >
          <Ionicons name="ios-close-circle" size={32} color="#C8CEED" />
        </TouchableOpacity>
      )}
    </View>
  );
}
