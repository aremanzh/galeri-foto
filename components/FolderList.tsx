import { Pressable, useColorScheme } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import { Searchbar, Text } from "react-native-paper";
import React from "react";
import { View } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface FolderListProps {
  folder: any[]; // Change 'object' to the appropriate data type for photos
  loading: boolean;
  // onRefresh: () => void; // Change 'null' to the appropriate function type
}

const FolderList: React.FC<FolderListProps> = ({ folder, loading }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const colorScheme = useColorScheme();

  return (
    <>
      <Searchbar
        mode="view"
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
        <Text variant="titleMedium">All Files</Text>
        <Pressable
          onPress={() =>
            router.push('/folder/create')
          }
        >
          {({ pressed }) => (
            <FontAwesome
              name="plus"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </View>
      <MasonryList
        data={folder}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
        showsVerticalScrollIndicator={false}
        loading={loading}
        renderItem={({ item }) => (
          <>
            <Link
              href={{
                pathname: "/folder/[id]",
                params: { id: item.id, url: item.source },
              }}
              asChild
            >
              <Pressable style={{ padding: 2 }}>
                <Image
                  contentFit="cover"
                  source={{ uri: item.source }}
                  style={{ height: 200, width: "100%" }}
                  transition={1000}
                />
              </Pressable>
            </Link>
          </>
        )}
      ></MasonryList>
    </>
  );
};

export default FolderList;
