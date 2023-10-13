import * as React from 'react';
import { useGlobalSearchParams, Stack, Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Pressable, useColorScheme, Platform } from "react-native";
import { Image } from 'expo-image';
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';
// import domtoimage from 'dom-to-image-more';
import * as MediaLibrary from 'expo-media-library';

import {Card, Text, Divider } from 'react-native-paper';
const LeftContent = props => <FontAwesome name="user" size={30} style={{ marginLeft: 15 }}/>

export default function PhotoDetail() {
  const imageRef = React.useRef();
  // var node = document.getElementById('my-node');
  const [isLoading, setIsLoading] = useState(false);
  const {id, url} = useGlobalSearchParams();
  const colorScheme = useColorScheme();

  console.log(url);
  

  // useEffect(() => {
  //   fetch(`https://randomuser.me/api/`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setCat(json.results[0]);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => console.error(error));
  // }, [id]);

  if (isLoading) {
    return <ActivityIndicator/>;
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await fetch(url, {
          method: "GET",
          mode: "no-cors"
        });
      
        if (response.ok) {
          // If the response is successful, create a blob from it
          const blob = await response.blob();
      
          // Create a URL for the blob
          const url = window.URL.createObjectURL(blob);
      
          // Create a link element to trigger the download
          let link = document.createElement('a');
          link.download = 'sticker-smash.jpeg';
          link.href = url;
      
          // Trigger the download by clicking the link
          link.click();
      
          // Clean up by revoking the object URL
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Response not ok', response.status, response.statusText);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <View style={{flex:1}}>
      <Stack.Screen options={{
        headerShown: true,
        title: id, 
        headerRight: () => (
            <Pressable onPress={onSaveImageAsync}>
              {({ pressed }) => (
                <FontAwesome
                  name="save"
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
        ),
      }}/>
      <Card mode='contained'>
        <View ref={imageRef} collapsable={false}>
          <Card.Cover id='photo' src={url} source={{ uri: url }} style={{height: 400,width: '100%'}}/>
        </View>
        <Card.Content>
          <Text variant="titleLarge">{id}</Text>
          <Text variant="bodyMedium">URL: {url}</Text>
          <Text variant="bodyMedium">Folder:</Text>
          <Text variant="bodyMedium">Image Name:</Text>
          <Text variant="bodyMedium">Description:</Text>
          <Text variant="bodyMedium">Size:</Text>
          <Text variant="bodyMedium">Upload Timestamp:</Text>
        </Card.Content>
        <Divider/>
        <Card.Title 
          title="Muat Naik oleh: " 
          subtitle="Bahagian: " 
          left={LeftContent} 
        />
      </Card>
    </View>
  );
}
