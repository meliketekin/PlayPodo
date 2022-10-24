import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Formik } from "formik";
import axios from "axios";
import API_URL from "../url.json";

export default function SignupScreen({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  //sign up işleminden sonra logine yönlendirme yapılacak
  function handleSignUp(values) {
    const url = `${API_URL.API_URL}/user/signup?name=${values.name}&email=${values.email}&password=${values.password}`;
    console.log();
    axios
      .post(url)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "User created successfully") {
          navigation.replace("LoginScreen");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validateOnMount={true}
      onSubmit={(values) => handleSignUp(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              {/* <Ionicons name="videocam" size={30} color="black" /> */}
              <Image
                source={require("../assets/images/logo.png")}
                style={{ width: 56, height: 56 }}
              />
              <Text style={styles.logo}>PlayPodo</Text>
            </View>

            <Text style={styles.description}>
              Sign up to start collecting data.
            </Text>
          </View>
          <Text style={styles.signupText}>Sign Up</Text>
          <View style={styles.textInputContainer}>
            <Text style={styles.nameText}>Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              returnKeyType="next"
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <Text style={styles.nameText}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType={"email-address"}
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <Text style={styles.nameText}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              ref={passwordRef}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? (
                  <Ionicons
                    style={{ marginLeft: 30 }}
                    name="checkbox"
                    size={23}
                    color="#0099ff"
                  />
                ) : (
                  <Ionicons
                    style={{ marginLeft: 30 }}
                    name="square-outline"
                    size={23}
                    color="gray"
                  />
                )}
              </TouchableOpacity>

              <Text style={styles.agreeText}>I agree to the</Text>
              <Text style={styles.termsText}> Terms of Service</Text>
            </View>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSubmit}
            >
              <Text style={styles.singUpButtonText}>Create my account</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 15,
              }}
            >
              <Text>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text style={{ color: "#0099ff", fontWeight: "bold" }}>
                  {" "}
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  signupText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "center",
    color: "#0A1551",
  },
  textInputContainer: {
    marginTop: 20,
    height: 400,
  },
  nameText: {
    marginLeft: 30,
    fontWeight: "bold",
    color: "#0A1551",
  },
  textInput: {
    borderWidth: 2,
    marginHorizontal: 30,
    height: 45,
    paddingLeft: 20,
    marginTop: 10,
    borderColor: "#C8CEED",
    borderRadius: 5,
    marginBottom: 20,
  },
  signUpButton: {
    borderRadius: 5,
    backgroundColor: "#78BB07",
    height: 50,
    marginHorizontal: 30,
    justifyContent: "center",
    marginTop: 10,
  },
  singUpButtonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
  agreeText: {
    marginLeft: 10,
    alignSelf: "center",
  },
  termsText: {
    color: "#0099ff",
    alignSelf: "center",
    fontWeight: "bold",
  },
  headerContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#0A1551",
    marginLeft: 10,
  },
  description: {
    color: "#6F76A7",
    fontSize: 16,
  },
});
