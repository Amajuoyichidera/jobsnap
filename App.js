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
  const [applyJobName, setApplyJobName] = useState('');
  const [applyJobCompany, setApplyJobCompany] = useState('');

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
              setName={setName}
              setMyTitle={setMyTitle}
              setMyImage={setMyImage}
              setApplyJobName={setApplyJobName}
              setApplyJobCompany={setApplyJobCompany}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='JobApply'>
          {(props) => (<JobApplyForm {...props} applyJobCompany={applyJobCompany} applyJobName={applyJobName} />)}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
