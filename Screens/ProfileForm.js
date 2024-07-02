import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';

const ProfileForm = ({ navigation, setName, setMyTitle, setMyImage }) => {
    const [loaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      });
    
      // Check if fonts are loaded
      if (!loaded) {
        return null; // Return null or a loading indicator until fonts are loaded
      }

  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [number, setNumber] = useState('');
  const [isFocused, setIsFocused] = useState({});
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = () => {
    if (!userName || !email || !age || !number || !title) {
      Alert.alert('Please Fill all the fields');
      return;
    } else {
      const trimmedUserName = userName.trim();
      const trimmedTitle = title.trim();
      Alert.alert(`Welcome to JobSnap ${trimmedUserName}`);
      setName(trimmedUserName);
      setMyImage(selectedImage);
      setMyTitle(trimmedTitle);
      setAge('');
      setEmail('');
      setNumber('');
      setUserName('');
      setTitle('');
      navigation.navigate('Jobs');
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  const userDefaultImg = require('../assets/profile.png');
  const userImg = selectedImage ? { uri: selectedImage } : userDefaultImg;

  return (
    <View style={styles.container}>
      <View style={styles.fillCon}>
        <Text style={styles.fill}>Fill Out Your Profile</Text>
        <View style={styles.imgSec}>
          <View style={styles.imgCon}>
            <Image style={styles.img} source={userImg} />
          </View>
          <View style={styles.plusCon}>
            <Icon style={styles.plus} onPress={pickImageAsync} name="plus" size={18} color="black" />
          </View>
        </View>
        <Text style={styles.upload}>Upload a photo</Text>
      </View>

      <View style={styles.inputCon}>
        <TextInput
          placeholderTextColor='#8C8C8C'
          style={[styles.input, { borderColor: isFocused.userName ? '#4869D7' : '#8C8C8C' }]}
          placeholder='Full Name'
          onChangeText={setUserName}
          onFocus={() => handleFocus('userName')}
          onBlur={() => handleBlur('userName')}
          value={userName}
        />
        <TextInput
          placeholderTextColor='#8C8C8C'
          style={[styles.input, { borderColor: isFocused.age ? '#4869D7' : '#8C8C8C' }]}
          onFocus={() => handleFocus('age')}
          onBlur={() => handleBlur('age')}
          placeholder='Age'
          onChangeText={setAge}
          value={age}
          keyboardType='numeric'
        />
        <TextInput
          placeholderTextColor='#8C8C8C'
          style={[styles.input, { borderColor: isFocused.email ? '#4869D7' : '#8C8C8C' }]}
          onFocus={() => handleFocus('email')}
          onBlur={() => handleBlur('email')}
          value={email}
          placeholder='Email'
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholderTextColor='#8C8C8C'
          style={[styles.input, { borderColor: isFocused.number ? '#4869D7' : '#8C8C8C' }]}
          onFocus={() => handleFocus('number')}
          onBlur={() => handleBlur('number')}
          value={number}
          placeholder='Phone number'
          onChangeText={setNumber}
          keyboardType='numeric'
        />
        <TextInput
          placeholderTextColor='#8C8C8C'
          style={[styles.input, { borderColor: isFocused.title ? '#4869D7' : '#8C8C8C' }]}
          onFocus={() => handleFocus('title')}
          onBlur={() => handleBlur('title')}
          value={title}
          onChangeText={setTitle}
          placeholder='Profession'
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  img: {
    height: 80,
    width: 55,
    resizeMode: 'cover',
  },
  container: {
    paddingTop: 110,
    paddingBottom: 50
  },
  fillCon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fill: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 20,
    fontFamily: 'Poppins',
  },
  imgCon: {
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    overflow: 'hidden',
  },
  imgSec: {
    display: 'flex',
    flexDirection: 'row'
  },
  plusCon: {
    backgroundColor: '#4869D7',
    borderRadius: 50,
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 85,
    marginLeft: -35
  },
  plus: {
    color: 'white',
  },
  upload: {
    color: '#8C8C8C',
    paddingTop: 20,
    fontFamily: 'Poppins',
  },
  input: {
    marginLeft: 20,
    width: 360,
    height: 50,
    borderWidth: 2,
    paddingHorizontal: 15,
    borderRadius: 20,
    fontFamily: 'Poppins',
  },
  inputCon: {
    display: 'flex',
    gap: 20,
    paddingTop: 50
  },
  btn: {
    marginLeft: 20,
    width: 360,
    height: 50,
    backgroundColor: 'black',
    marginTop: 20,
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    padding: 12,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  }
});
