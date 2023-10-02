import MasonryList from "@react-native-seoul/masonry-list";
import { Pressable } from "react-native";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import { Searchbar } from "react-native-paper";
import React from "react";
import { Text } from "./Themed";

interface FolderItemProps {
    item: any[]; // Change 'object' to the appropriate data type for photos
    loading: boolean;
    // onRefresh: () => void; // Change 'null' to the appropriate function type
  }
  
  const FolderItem: React.FC<FolderItemProps> = ({ item, loading }) => {

    return (
        <MasonryList
        data={item}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
        showsVerticalScrollIndicator={false}
        loading={loading}
        renderItem={({ item }) => (
            <Image
                contentFit="cover"
                source={{ uri: item.source }}
                style={{ height: 400, width: "100%" }}
                transition={1000}
            />
        )}/>
    )
}


export default FolderItem;
