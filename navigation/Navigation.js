import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SubmissionListScreen from "../screens/SubmissionListScreen.js";
import FormEditScreen from "../screens/FormEditScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import NewVideoaskScreen from "../screens/NewVideoaskScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SubmissionDetailScreen from "../screens/SubmissionDetailScreen";
import VideoaskPreviewScreen from "../screens/VideoaskPreviewScreen";
import NewVideoaskStepsScreen from "../screens/NewVideoaskStepsScreen";
import FillFormScreen from "../screens/FillFormScreen.js";
import AnswersPreviewScreen from "../screens/AnswersPreviewScreen.js";
import * as Linking from "expo-linking";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const prefix = Linking.createURL("/");

export default function Navigation() {
  const linking = {
    prefixes: [prefix],
  };

  console.log(Linking.useURL());

  const userToken = useSelector((state) => state.userToken.token);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={
            userToken
              ? ({ navigation }) => ({
                  title: "Forms",
                  headerStyle: {
                    backgroundColor: "#0A1551",
                    height: 80,
                  },
                  headerTitleAlign: "center",
                  headerTintColor: "white",
                  headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                    alignSelf: "center",
                  },
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ProfileScreen")}
                    >
                      <Ionicons
                        name="settings-sharp"
                        size={25}
                        color="white"
                        style={{ marginRight: 20 }}
                      />
                    </TouchableOpacity>
                  ),
                  headerLeft: () => {
                    <></>;
                  },
                })
              : { headerShown: false }
          }
        />
        <Stack.Screen
          name="SubmissionListScreen"
          component={SubmissionListScreen}
          options={({ navigation }) => ({
            title: "Submissions",
            headerStyle: {
              backgroundColor: "#43A6BB",
              height: 80,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileScreen")}
              >
                <Ionicons
                  name="settings-sharp"
                  size={25}
                  color="white"
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
            ),
            headerBackTitle: "",
            headerBackTitleStyle: {
              fontWeight: "normal",
              fontSize: 14,
            },
          })}
        />
        <Stack.Screen
          name="SubmissionDetailScreen"
          component={SubmissionDetailScreen}
          options={({ navigation, route }) => ({
            title: route.params.formName,
            headerStyle: {
              backgroundColor: "#43A6BB",
              height: 80,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerBackTitle: "",
            headerBackTitleStyle: {
              fontWeight: "normal",
              fontSize: 14,
            },
          })}
        />
        <Stack.Screen
          name="FormEditScreen"
          component={FormEditScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewVideoaskStepsScreen"
          component={NewVideoaskStepsScreen}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="NewVideoaskScreen"
          component={NewVideoaskScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.RevealFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="VideoaskPreviewScreen"
          component={VideoaskPreviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={() => ({
            title: "Profile",
            headerStyle: {
              backgroundColor: "#0A1551",
              height: 80,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerBackTitle: "",
            headerBackTitleStyle: {
              fontWeight: "normal",
              fontSize: 14,
            },
          })}
        />
        <Stack.Screen
          name="form"
          component={FillFormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AnswersPreviewScreen"
          component={AnswersPreviewScreen}
          options={({ navigation, route }) => ({
            title: "Preview Answers",
            headerStyle: {
              backgroundColor: "#252D5B",
              height: 80,
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerBackTitle: "",
            headerBackTitleStyle: {
              fontWeight: "normal",
              fontSize: 14,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
