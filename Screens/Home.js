import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.job}>JOBSNAP</Text>
      <View>
        <View>
        <Image style={styles.img} source={require('../assets/landingImg.png')} />
        </View>
        <View style={styles.overCon}>
        <Text style={styles.over}>
            Over <Text style={styles.jobs}>5,000 Jobs</Text> {'\n'} are waiting for {'\n'} you.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.btn}>
            <Text style={styles.btnText}>Start Searching</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    img: {
        height: 350,
        width: 370,
        position: 'absolute',
        marginTop: 150,
        marginLeft: 20,
    },
    container: {
        paddingTop: 20,
    },
    job: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 70,
        fontSize: 20,
        fontWeight: 'bold'
    },
    overCon: {
        paddingTop: 550,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    over: {
        fontSize: 48,
        fontWeight: 'bold'
    },
    jobs: {
        color: '#4F6FD9'
    },
    btn: {
        backgroundColor: 'black',
        width: 350,
        height: 50,
        marginTop: 30,
        borderRadius: 20,
        padding: 10,
        cursor: 'pointer'
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    }

})