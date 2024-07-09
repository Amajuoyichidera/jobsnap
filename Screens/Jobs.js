import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

const Jobs = ({ myImage, setMyImage, name, myTitle, navigation, setName, setMyTitle, setApplyJobName, setApplyJobCompany }) => {
  const [loaded] = useFonts({
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const userDefaultImg = require('../assets/profile.png');
  const userImg = myImage ? { uri: myImage } : userDefaultImg;
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [meanSalary, setMeanSalary] = useState(0);
  const [editProfile, setEditProfile] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempTitle, setTempTitle] = useState(myTitle);
  const [tempImage, setTempImage] = useState(userImg);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setTempImage({ uri: result.assets[0].uri });
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    const API_KEY = '1ffd5a8cad9ae74bc8ef20fde6978d9a';
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2a71717e&app_key=${API_KEY}&results_per_page=150`;

    try {
      const response = await axios.get(url);
      setJobs(response.data.results);
      setMeanSalary(response.data.mean);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    const API_KEY = '1ffd5a8cad9ae74bc8ef20fde6978d9a';
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2a71717e&app_key=${API_KEY}&results_per_page=200&what=${encodeURIComponent(searchText)}`;
    
    if(searchText === '') {
      Alert.alert('input a text');
      return;
    } else {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setJobs(response.data.results);
        setMeanSalary(response.data.mean);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    }
   
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setApplyJobName(job.title);
    setApplyJobCompany(job.company.display_name);
    setModalVisible(true);
  };

  const closeJobDetails = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };

  const handleApply = () => {
    setModalVisible(false);
    setSelectedJob(null);
    navigation.navigate('JobApply');
  };

  const handleSave = () => {
    setName(tempName);
    setMyTitle(tempTitle);
    setMyImage(tempImage.uri);
    setEditProfile(false);
  };

  const handleClose = () => {
    setEditProfile(false);
  };

  const renderJobDescription = () => {
    if (!selectedJob) return null;

    return (
      <ScrollView style={styles.jobDetailsScroll}>
        <Text style={styles.jobDetailsTitle}>{selectedJob.title}</Text>
        <Text style={styles.jobDetailsCompany}>{selectedJob.company.display_name}</Text>
        <Text style={styles.jobDetailsSectionTitle}>Description:</Text>
        <Text style={styles.jobDetailsText}>{selectedJob.description}</Text>
        <Text style={styles.jobDetailsSectionTitle}>Requirements:</Text>
        <Text style={styles.jobDetailsText}>{selectedJob.requirements}</Text>
        <Text style={styles.jobDetailsSectionTitle}>Location:</Text>
        <Text style={styles.jobDetailsText}>{selectedJob.location.display_name}</Text>
        <Text style={styles.jobDetailsSectionTitle}>Salary:</Text>
        <Text style={styles.jobDetailsText}>{selectedJob.salary ? `$${selectedJob.salary.min} - $${selectedJob.salary.max}` : 'N/A'}</Text>
        <Text style={styles.jobDetailsSectionTitle}>Created:</Text>
        <Text style={styles.jobDetailsText}>{new Date(selectedJob.created).toLocaleDateString()}</Text>
        <Text style={styles.jobDetailsSectionTitle}>Mean Salary:</Text>
        <Text style={styles.jobDetailsText}>{`$${meanSalary}`}</Text>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={closeJobDetails}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleJobClick(item)} style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>Company: {item.company.display_name}</Text>
      <Text style={styles.jobLocation}>Location: {item.location.display_name}</Text>
      <Text style={styles.jobSalary}>Salary: {item.salary ? `$${item.salary.min} - $${item.salary.max}` : 'N/A'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.imgCon}>
          <Image style={styles.img} source={userImg} />
        </View>
        <View style={styles.textCon}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text2}>{myTitle}</Text>
        </View>
        <Icon onPress={() => setEditProfile(true)} name="cog" size={30} color="#000" />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search jobs..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Job Listings</Text>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={() => Alert.alert('Jobs finished')}
        />
      )}

      {/* Modal for job details */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeJobDetails}
      >
        <View style={styles.modalContainer}>
          {renderJobDescription()}
        </View>
      </Modal>

      {/* Modal to edit profile */}
      <Modal
        animationType='slide'  
        transparent={true}
        visible={editProfile}
      >
        <View style={styles.modalBackground}>
          <View style={styles.profileModal}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <View style={styles.imgSec}>
              <View style={styles.imgCon}>
                <Image style={styles.img} source={tempImage} />
              </View>
             <TouchableOpacity style={styles.plusCon} onPress={pickImageAsync}>
               <Icon style={styles.plus} name="plus" size={18} color="black" />
             </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={tempName}
              onChangeText={setTempName}
            />
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={tempTitle}
              onChangeText={setTempTitle}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.proButton} onPress={handleSave}>
                <Text style={styles.probuttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.proButton, styles.procloseButton]} onPress={handleClose}>
                <Text style={styles.probuttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imgCon: {
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  img: {
    height: 75,
    width: 75,
  },
  textCon: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
  },
  text2: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    fontFamily: 'Poppins',
    color: '#888',
  },
  searchButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginBottom: 20,
  },
  jobItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  jobCompany: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins',
  },
  jobLocation: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins',
  },
  jobSalary: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Poppins',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  jobDetailsScroll: {
    marginTop: 40,
    paddingBottom: 40,
  },
  jobDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  jobDetailsCompany: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  jobDetailsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Poppins',
  },
  jobDetailsText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins',
    color: '#666',
    lineHeight: 27,
  },
  applyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profileModal: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Poppins',
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  proButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  procloseButton: {
    backgroundColor: '#FF6347',
  },
  probuttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  plusCon: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginLeft: 50
  },
  plus: {
    color: 'white',
  },
  imgSec: {
    marginBottom: 20
  },
});
