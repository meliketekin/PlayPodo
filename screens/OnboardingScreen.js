import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useFonts } from "expo-font";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const slides = [
  {
    key: 1,
    title: "Welcome to\nVideoask",
    text: "Go from busywork to less work with\npowerful forms that get it done.",
    image: require("../assets/images/onboarding/onboarding1.png"),
    backgroundColor: "#0099FF",
  },
  {
    key: 2,
    title: "10.000+ Free\nForm Templates",
    text: "Get a head start with ready-made form\ntemplates. Customize to match your\nneeds in a few easy clicks.",
    image: require("../assets/images/onboarding/onboarding2.png"),
    backgroundColor: "#FF6100",
  },
  {
    key: 3,
    title: "Collaborate with\nYour Team",
    text: "Assign forms to members of your team\nso they can collect and manage\nresponses anywhere — even offline.",
    image: require("../assets/images/onboarding/onboarding3.png"),
    backgroundColor: "#FFB629",
  },
];

export default function OnboardingScreen({ navigation }) {
  const [loaded] = useFonts({
    HandleeRegular: require("../assets/fonts/Handlee-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <StatusBar style="dark"/>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.buttonText}>Get Started</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      showSkipButton
      renderDoneButton={renderDoneButton}
      activeDotStyle={styles.activeDot}
      onDone={() => navigation.replace("LoginScreen")}
      onSkip={() => navigation.replace("LoginScreen")}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginTop: 40,
    fontFamily: "HandleeRegular",
  },
  text: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
    marginTop: 50,
  },
  image: {
    width,
    height: height / 2,
    marginTop: 20,
  },
  doneButton: {
    backgroundColor: "#091141",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
  },
  activeDot: {
    backgroundColor: "white",
    width: 40,
  },
});
