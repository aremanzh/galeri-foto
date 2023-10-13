import { router } from "expo-router";
import { useSession } from "../context/auth";
import { Image, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import {
  Button,
  TextInput,
  HelperText,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const { signIn } = useSession();

  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const isEmpty = (input) => {
    const trimmedInput = input.trim(); // Remove leading and trailing whitespace
    return trimmedInput.length === 0;
  }

  const handleSubmit = async () => {
    if(!id || !password){
      alert("Please fill in the credential forms before proceed")
      return;
    } else {
      try {
        setLoading(true);
        const response = await axios.post("http://10.85.146.142:8000/api/v1/signin", {
          staff_ic: id,
          password: password,
        });
  
        setLoading(false);
        alert(response.data.message);
        signIn();
        router.replace("/");
  
        // setAuth(data);
        // await AsyncStorage.setItem('@auth', JSON.stringify(data));
        // alert("Login successful");
        // setLoading(false);
        // navigation.navigate("Home", { user: { id: data.user._id, name: data.user.name } });
      } catch (err) {
        console.log(err);
        setLoading(false);
        alert(err.response.data.error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : (
        <>
          <Nav />
          <TextInput
            label="ID (81xxxxxxxxxx)"
            value={id}
            onChangeText={(id) => setID(id)}
            autoComplete="off"
            keyboardType="numeric"
            style={styles.input}
          />
          <HelperText type="error" visible={isEmpty(id)}>
            ID is required!
          </HelperText>
          <TextInput
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
            autoComplete="password"
            style={styles.input}
          />
          <HelperText type="error" visible={isEmpty(password)}>
            Password is required!
          </HelperText>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          {id && password ? <Button mode="contained" icon="send" onPress={handleSubmit}>
            Login
          </Button> : <Button disabled mode="contained" icon="send">
            Login
          </Button>}
          
        </>
      )}
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
  },
});
