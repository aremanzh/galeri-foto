import { Pressable, TouchableOpacity } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { Text, View } from "./Themed";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import { Searchbar } from "react-native-paper";
import React from "react";

interface PhotosListProps {
  photos: any[]; // Change 'object' to the appropriate data type for photos
  loading: boolean;
  // onRefresh: () => void; // Change 'null' to the appropriate function type
}

const PhotosList: React.FC<PhotosListProps> = ({ photos, loading }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      <Searchbar
        mode="view"
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <MasonryList
        data={photos}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
        showsVerticalScrollIndicator={false}
        loading={loading}
        renderItem={({ item }) => (
          <>
            <Link
              href={{
                pathname: "/photo/[id]",
                params: { id: item.id, url: `http://10.85.146.142:8000/storage/${item.uri}` },
              }}
              asChild
            >
              <Pressable>
                <Image
                  contentFit="cover"
                  source={{ uri: `http://10.85.146.142:8000/storage/${item.uri}` }}
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

export default PhotosList;
