import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileForm from './Screens/ProfileForm';
import Jobs from './Screens/Jobs';
import { useState } from 'react';
import JobApplyForm from './Screens/JobApplyForm';

const Stack = createStackNavigator();

export default function App() {
  const [name, setName] = useState('');
  const [myTitle, setMyTitle] = useState('');
  const [myImage, setMyImage] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Profile'>
          {(props) => (
            <ProfileForm
              {...props}
              setName={setName}
              setMyImage={setMyImage}
              setMyTitle={setMyTitle}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='Jobs'>
          {(props) => (
            <Jobs
              {...props}
              myImage={myImage}
              myTitle={myTitle}
              name={name}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='JobApply' component={JobApplyForm} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
