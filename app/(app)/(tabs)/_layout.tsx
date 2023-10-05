import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, router, Tabs } from 'expo-router';
import { Pressable, useColorScheme, View, Image } from 'react-native';

import Colors from '../../../constants/Colors';

import logo from "../../../assets/images/logo.png";
import { useSession } from '../../../context/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function Nav() {
  return (
    <View style={{marginHorizontal: 20}}>
      <Pressable onPress={() => router.replace('/')}>
        <Image source={logo} style={{width: 350, height: 100}} resizeMode={'contain'}/>
      </Pressable>
    </View>
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { signOut } = useSession();

  const handleLogout = async () => {
    signOut();
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerLeft: () => <Nav/>,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Utama',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
              <Pressable onPress={handleLogout}>
                {({ pressed }) => (
                  <MaterialCommunityIcons name="logout" size={25} color={Colors[colorScheme ?? 'light'].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Carian',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="folder"
        options={{
          title: 'Program',
          tabBarIcon: ({ color }) => <TabBarIcon name="folder" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
