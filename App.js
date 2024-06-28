import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileForm from './Screens/ProfileForm';
import Jobs from './Screens/Jobs';
import { useState } from 'react';

const Stack = createStackNavigator();

export default function App() {
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Profile'>
          {(props) => <ProfileForm {...props} userName={userName} setUserName={setUserName} title={title} setTitle={setTitle} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
        </Stack.Screen>
        <Stack.Screen name='Jobs'>
          {(props) => <Jobs {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
