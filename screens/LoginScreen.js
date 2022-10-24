import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { setToken } from "../redux/slices/tokenSlice";
import { useSelector, useDispatch } from "react-redux";
import API_URL from "../url.json";
import { useRef } from "react";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userToken.token);
  const passwordRef = useRef();

  // console.log(token);
  function handleLogin(values) {
    // const url = `${API_URL.API_URL}/user/login?email=${values.email}&password=${values.password}`;
    // axios
    //   .post(url)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log(res.data);
    //       dispatch(setToken(res.data.message.token));
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: "HomeScreen" }],
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    dispatch(
      setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIn0.UVcQP1df-6lg11oEe0h0HaFQnuKFRLh0RpTfSLV4iSk"
      )
    );
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnMount={true}
      onSubmit={(values) => {
        handleLogin(values);
      }}
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
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.loginText}>Sign In </Text>
          <View style={styles.textInputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType={"email-address"}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={true}
              ref={passwordRef}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 15,
              }}
            >
              <Text>Don't you have an account yet?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("SignupScreen")}
              >
                <Text style={{ color: "#0099ff", fontWeight: "bold" }}>
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
    alignSelf: "center",
    color: "#0A1551",
  },
  textInputContainer: {
    marginTop: 50,
    height: 400,
  },
  label: {
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
    marginBottom: 30,
  },
  loginButton: {
    borderRadius: 5,
    backgroundColor: "#78BB07",
    height: 50,
    marginHorizontal: 30,
    justifyContent: "center",
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
});
