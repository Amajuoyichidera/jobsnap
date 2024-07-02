import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useFonts } from 'expo-font';

const Jobs = ({ myImage, name, myTitle, navigation }) => {
  const [loaded] = useFonts({
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  // Check if fonts are loaded
  if (!loaded) {
    return null; // Return null or a loading indicator until fonts are loaded
  }

  const userDefaultImg = require('../assets/profile.png');
  const userImg = myImage ? { uri: myImage } : userDefaultImg;
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [meanSalary, setMeanSalary] = useState(0);
  

  useEffect(() => {
    fetchJobs(); // Fetch initial jobs on component mount
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    const API_KEY = '1ffd5a8cad9ae74bc8ef20fde6978d9a'; // Replace with your Adzuna API Key
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2a71717e&app_key=${API_KEY}&results_per_page=100`;

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
    setIsLoading(true);
    const API_KEY = '1ffd5a8cad9ae74bc8ef20fde6978d9a'; // Replace with your Adzuna API Key
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=2a71717e&app_key=${API_KEY}&results_per_page=200&what=${encodeURIComponent(searchText)}`;

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

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setModalVisible(true); // Show job details modal
  };

  const closeJobDetails = () => {
    setModalVisible(false);
    setSelectedJob(null); // Clear selected job
  };

  const handleApply = () => {
    setModalVisible(false);
    setSelectedJob(null);
    navigation.navigate('JobApply')
  }

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
      <Text style={styles.jobCompany}>{item.company.display_name}</Text>
      <Text style={styles.jobLocation}>{item.location.display_name}</Text>
      <Text style={styles.jobSalary}>{item.salary ? `$${item.salary.min} - $${item.salary.max}` : 'N/A'}</Text>
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
        <Icon name="cog" size={30} color="#000" />
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
    borderColor: 'black',
    borderWidth: 2,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  img: {
    height: 70,
    width: 55,
    resizeMode: 'cover',
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
    backgroundColor: '#ccc',
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
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
