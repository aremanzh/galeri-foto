import { Pressable, TouchableOpacity } from "react-native";
import MasonryList from '@react-native-seoul/masonry-list';
import { View } from "./Themed";
import { Link,router } from 'expo-router';
import { Image } from 'expo-image';

interface PhotosListProps {
    photos: any[]; // Change 'object' to the appropriate data type for photos
    loading: boolean;
    // onRefresh: () => void; // Change 'null' to the appropriate function type
  }


  const PhotosList: React.FC<PhotosListProps> = ({ photos, loading }) => {
    const handlePress = (item) => {
        router.push(`/photo/${item.id}`, {pathname: 'photo', params: {id: item.id}})
    }

    return (
        <MasonryList 
            data={photos}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()} // You may want to use a unique key
            showsVerticalScrollIndicator={false}
            loading={loading}
            renderItem={({ item }) => (
                <>
                    <Link href={{pathname: '/photo/[id]', params: {id: item.id, url: item.source}}} asChild>
                        <Pressable>
                            <Image 
                                contentFit='cover'
                                source={{ uri: item.source }}
                                style={{ height: 200, width: "100%" }}
                                transition={1000}
                            />
                        </Pressable>
                    </Link>
                </>
            )}
        >

        </MasonryList>
    );
  };
  
  export default PhotosList;