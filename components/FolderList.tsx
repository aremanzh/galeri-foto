import { Pressable } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { Link, router } from "expo-router";
import { Image } from "expo-image";
import { Searchbar } from "react-native-paper";
import React from "react";

interface FolderListProps {
  folder: any[]; // Change 'object' to the appropriate data type for photos
  loading: boolean;
  // onRefresh: () => void; // Change 'null' to the appropriate function type
}

const FolderList: React.FC<FolderListProps> = ({ folder, loading }) => {
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
              <Pressable style={{padding:2}}>
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
