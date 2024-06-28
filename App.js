import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
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
=======
import { StyleSheet, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

export default function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const onReset = () => {
    setShowAppOptions(false);
  }

    const onAddSticker = () => {
     setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  }

  const onSaveImageAsync = async () => {
    // we will implement this later
  };


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if(!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer image={selectedImage} placeholder={require('./assets/images/background-image.png')} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label='Save' onPress={onSaveImageAsync} />
          </View>
        </View>
      ) :
       <View style={styles.footerContainer}>
       <Button onPress={pickImageAsync} label='Choose a photo' theme='primary' />
       <Button onPress={() => setShowAppOptions(true)} label='Use this photo' />
       </View> }
       <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
       </EmojiPicker>
      <StatusBar style="auto" />
    </View>
>>>>>>> 4525ea231236835caf3d8b0b51377d7c8fc53417
  );
}

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    
=======
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
>>>>>>> 4525ea231236835caf3d8b0b51377d7c8fc53417
  },
});
