import { Image, StyleSheet  } from "react-native";
import { View } from "../../components/Themed";
import { Button, TextInput } from "react-native-paper";
import logo from "../../assets/images/logo.png";
import React from "react";
import { router } from 'expo-router';

export default function LoginScreen() {
  const [id, setID] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  const handleSubmit = () => {
      router.push(`/`);
  }

  return (
    <View style={styles.container}>
      <Nav />
      <TextInput
        label="ID"
        value={id}
        onChangeText={(id) => setID(id)}
        autoComplete="email"
        keyboardType="email-address"
        style={styles.input}
      />
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
