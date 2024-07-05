import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useFonts } from 'expo-font';

const JobApplyForm = ({ navigation }) => {
    const [loaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      });
    
      // Check if fonts are loaded
      if (!loaded) {
        return null; // Return null or a loading indicator until fonts are loaded
      }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cv, setCv] = useState(null);
  const [number, setNumber] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleFilePicker = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (res && res.assets && Array.isArray(res.assets)) {
        res.assets.map(item => {
          setCv(item.name);
        });
      }
    } catch (err) {
      alert('Error: ', err);
    }
  };

  const handleSubmit = () => {
    if (name && email && number && cv) {
      setIsSuccessModalVisible(true);
    //   setCv('');
    //   setEmail('');
    //   setName('');
    //   setNumber('');
    } else {
      Alert.alert('Please fill all fields and select a CV.');
    }
  };

  const closeModal = () => {
    setIsSuccessModalVisible(false);
    navigation.navigate('Jobs');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.info}>
            Contact Info
        </Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

     <Text style={styles.label}>Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Phone Number"
        value={number}
        onChangeText={setNumber}
        keyboardType='numeric'
      />

      <Text style={styles.label}>CV:</Text>
      <TouchableOpacity style={styles.button} onPress={handleFilePicker}>
        <Text style={styles.buttonText}>{cv ? cv : 'Select CV'}</Text>
      </TouchableOpacity>

      <View style={styles.btn2Con}>
      <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Application</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {backgroundColor: '#FF6347'}]} onPress={() => navigation.navigate('Jobs')}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Application Successful!</Text>
            <Button title="Close" onPress={() => navigation.navigate('Jobs')} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontFamily: 'Poppins',
    color: '#888',        
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  btn2Con: {
    marginTop: 150,
  },
  info: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 30,
    textTransform: 'uppercase',
    fontFamily: 'Poppins',
  }
});

export default JobApplyForm;
