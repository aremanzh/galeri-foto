import * as React from 'react';
import { useGlobalSearchParams, Stack, Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Pressable, useColorScheme } from "react-native";
import { Image } from 'expo-image';
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

import { Avatar, Button, Card, Text } from 'react-native-paper';
const LeftContent = props => <FontAwesome name="user" size={30} style={{ marginLeft: 15 }}/>

export default function PhotoDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const {id, url} = useGlobalSearchParams();

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

  const colorScheme = useColorScheme();

  return (
    <View style={{flex:1}}>
      <Stack.Screen options={{
        title: id, 
        headerRight: () => (
            <Pressable onPress={() => alert("Download...")}>
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
        <Card.Cover source={{ uri: url }} style={{height: 400,width: '100%'}}/>
        <Card.Content>
          <Text variant="titleLarge">{id}</Text>
          <Text variant="bodyMedium">URL: {url}</Text>
          <Text variant="bodyMedium">Folder:</Text>
          <Text variant="bodyMedium">Image Name:</Text>
          <Text variant="bodyMedium">Description:</Text>
          <Text variant="bodyMedium">Size:</Text>
          <Text variant="bodyMedium">Upload Timestamp:</Text>
        </Card.Content>
        <Card.Title 
        title="Muat Naik oleh: " 
        subtitle="Bahagian: " 
        left={LeftContent} />
      </Card>
    </View>
  );
}
