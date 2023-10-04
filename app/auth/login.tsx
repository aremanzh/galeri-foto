import { Image, StyleSheet  } from "react-native";
import { View } from "../../components/Themed";
import { Button, TextInput, HelperText } from "react-native-paper";
import logo from "../../assets/images/logo.png";
import React from "react";
import axios from "axios";
import { router } from 'expo-router';

export default function LoginScreen() {
  const [id, setID] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function Nav() {
    return (
      <View style={{ marginHorizontal: 20 }}>
        <Image
          source={logo}
          style={{ width: 350, height: 100 }}
          resizeMode={"contain"}
        />
      </View>
    );
  }

  const hasOnlyNumbers = (inputString) => {
    const regex = /^[0-9]+$/;
    return !regex.test(inputString);
  };
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://127.0.0.1:8000/api/v1/signin", {
        "staff_ic": id,
        "password": password,
      });

      console.log(data);
      
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("berjaya log masuk");
        setLoading(false);
        router.replace(`/`);
       
        // setAuth(data);
        // await AsyncStorage.setItem('@auth', JSON.stringify(data));
        // alert("Login successful");
        // setLoading(false);
        // navigation.navigate("Home", { user: { id: data.user._id, name: data.user.name } });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Nav />
      <TextInput
        label="ID (81xxxxxxxxxx)"
        value={id}
        onChangeText={(id) => setID(id)}
        autoComplete="email"
        keyboardType="email-address"
        style={styles.input}
      />
      <HelperText type="error" visible={hasOnlyNumbers(id)}>
        ID is invalid!
      </HelperText>
      <TextInput
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        autoComplete="password"
        style={styles.input}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button mode="contained" icon='send' onPress={handleSubmit}>
      Login
    </Button>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    width: 350,
  }
});
