import { StyleSheet, useColorScheme } from 'react-native';

import { View } from '../components/Themed';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';

export default function UploadScreen() {
  const colorScheme = useColorScheme();
  const [id, setID] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({ uri: asset.uri }));
      // setImages((prevImages) => [...prevImages, ...selectedImages]);
      setImage(selectedImages);
      // uploadImage(selectedImages);
    }
  };
  
  const handleSubmit = () => {
    alert("hantar form")
  }



  return (
    <View style={styles.container}>
      <Card style={{height: 600, width: 400, justifyContent: 'center', alignContent: 'center'}}>
        {/* <Link style={{alignSelf: 'center'}} href={'/'}>
          <Avatar.Icon icon="upload"/>
        </Link> */}
        {image ? <Text style={{alignSelf: 'center', fontStyle: 'italic'}}>{image.length} gambar telah dipilih.</Text> : 
        <View style={{ alignItems: 'center', backgroundColor: 'transparent'}}>
          <FontAwesome
            name="upload"
            size={150}
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 15 }} onPress={pickImage}
          />
          <Text variant="labelMedium">Klik untuk muat naik</Text>
        </View>}
        
        <TextInput
          label="Deskripsi"
          value={id}
          onChangeText={(id) => setID(id)}
          autoComplete="email"
          keyboardType="email-address"
          style={{marginTop: 30,width: 300, alignSelf: 'center'}}
          multiline={true}
          numberOfLines={10}
        />
        <Button onPress={() => handleSubmit()} mode='contained' style={{width: 300, alignSelf: 'center', marginTop: 30}}>
          Hantar
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
