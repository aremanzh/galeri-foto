import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { Searchbar } from 'react-native-paper';
import FolderList from '../../../components/FolderList';

export default function FolderScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const folder = [
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FolderList loading={true} folder={folder}/>
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
