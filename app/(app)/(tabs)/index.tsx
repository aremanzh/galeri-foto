import axios from 'axios';
import { useState, useEffect } from 'react';
import { ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native';

import PhotosList from '../../../components/PhotosList';
import { Text, View } from '../../../components/Themed';

export default function Home() {
  const [photo, setPhoto] = useState({
    photos: [],
    selected: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, [])

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(`http://10.85.146.142:8000/api/v1/photos`);
      console.log(data);
      setPhoto(prevPhotos => ({
        ...prevPhotos,
        photos: data
      }));
      setLoading(false);
    } catch (error) {
      console.log(error); 
      setLoading(false);
    }

  }

  // const photos = [
  //   {
  //     id: 1,
  //     source: "https://picsum.photos/id/43/512",
  //   },
  //   {
  //     id: 2,
  //     source: "https://picsum.photos/id/35/512",
  //   },
  //   {
  //     id: 3,
  //     source: "https://picsum.photos/id/28/512",
  //   },
  //   {
  //     id: 4,
  //     source: "https://picsum.photos/id/17/512",
  //   },
  //   {
  //     id: 5,
  //     source: "https://picsum.photos/id/58/512",
  //   },
  //   {
  //     id: 6,
  //     source: "https://picsum.photos/id/59/512",
  //   },
  //   {
  //     id: 7,
  //     source: "https://picsum.photos/id/57/512",
  //   },
  //   {
  //     id: 8,
  //     source: "https://picsum.photos/id/60/512",
  //   },
  //   {
  //     id: 9,
  //     source: "https://picsum.photos/id/64/512",
  //   },
  //   {
  //     id: 10,
  //     source: "https://picsum.photos/id/70/512",
  //   },
  // ]

  return (
    <ScrollView showsVerticalScrollIndicator={false}>      
      <PhotosList loading={true} photos={photo.photos}/>
    </ScrollView>
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
