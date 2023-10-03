import * as React from 'react';
import { useGlobalSearchParams, Stack, Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Pressable, useColorScheme, Platform } from "react-native";
import { Image } from 'expo-image';
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { captureRef } from 'react-native-view-shot';
// import domtoimage from 'dom-to-image';
import domtoimage from 'dom-to-image-more';
import * as MediaLibrary from 'expo-media-library';

import {Card, Text, Divider } from 'react-native-paper';
import FolderItem from '../../components/FolderItem';

export default function PhotoDetail() {
    const itemList = [
    {
        id: 1,
        source: "https://picsum.photos/id/23/512",
    },
    {
        id: 2,
        source: "https://picsum.photos/id/45/512",
    },
    {
        id: 3,
        source: "https://picsum.photos/id/58/512",
    },
    {
        id: 4,
        source: "https://picsum.photos/id/67/512",
    },
    {
        id: 5,
        source: "https://picsum.photos/id/78/512",
    },
    {
        id: 6,
        source: "https://picsum.photos/id/89/512",
    },
    {
        id: 7,
        source: "https://picsum.photos/id/47/512",
    },
    {
        id: 8,
        source: "https://picsum.photos/id/30/512",
    },
    {
        id: 9,
        source: "https://picsum.photos/id/24/512",
    },
    {
        id: 10,
        source: "https://picsum.photos/id/10/512",
    },
    ]

  const imageRef = React.useRef();
  var node = document.getElementById('my-node');
  const [isLoading, setIsLoading] = useState(false);
  const {id, url} = useGlobalSearchParams();
  const colorScheme = useColorScheme();

  if (isLoading) {
    return <ActivityIndicator/>;
  }

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
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
        domtoimage
        .toJpeg(document.getElementById('photo'))
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = `${url}-${Date.now()}.jpeg`;
            link.href = dataUrl;
            link.click();
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={{flex:1}}>
      <Stack.Screen options={{
        headerShown: true,
        title: id, 
        headerRight: () => (
            <View style={{flexDirection: 'row'}}>
                <Pressable onPress={() => router.push({ pathname: '/folder/upload', params: { id: id } })}>
                {({ pressed }) => (
                    <FontAwesome
                    name="upload"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                )}
                </Pressable>
                <Pressable onPress={() => alert("download")}>
                {({ pressed }) => (
                    <FontAwesome
                    name="save"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                )}
                </Pressable>
            </View>
        ),
      }}/>
      <FolderItem item={itemList} loading={isLoading}/>
    </View>
  );
}
