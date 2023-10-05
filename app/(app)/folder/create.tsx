import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';

export default function FolderCreateScreen() {
    const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: true,
        title: 'Add album', 
        headerRight: () => (
            <Pressable onPress={() => console.log("sss")}>
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
    </View>
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
