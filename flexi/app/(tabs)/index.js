import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import Header from '../components/Header';
import Want from '../components/Want';
import MyRec from '../components/MyRecords';
import foodbk from '@/assets/images/food.jpg';
import handShake from '@/assets/images/handshake.webp';
import mascot from '@/assets/images/donsMascot.jpg';

const App = () => {

  const [activeCard, setActiveCard] = useState(null);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });


  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };


  const handleSubmit = async () => {

    const url = 'http://localhost:8000/offers';


    const payload = {
      message: formData.message,

    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Submission successful:', data);

      } else {
        console.error('Submission failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    setFormData({ name: '', id: '', message: '' });
    setActiveCard(null);
  };


  const onBack = () => {
    setActiveCard(null);
  };

  const renderContent = () => {
    if (activeCard === 'give') {
      return (
        <View style={styles.detail}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Give Form</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Student ID"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Message"
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
              value={formData.message}
              onChangeText={(text) => handleInputChange('message', text)}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (activeCard === 'want') {
      return (
        <View style={styles.detail}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
          <Want />
        </View>
      );
    } else if (activeCard === 'myrec') {
      return (
        <View style={styles.detail}>
          <TouchableOpacity onPress={onBack}>
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
          <MyRec />
        </View>
      );
    } else {
      // Home view with all cards.
      return (
        <View>
          <View style={styles.cards}>
            <TouchableOpacity onPress={() => setActiveCard('give')}>
              <ImageBackground
                source={foodbk}
                resizeMode="cover"
                style={styles.img}
              >
                <Text style={styles.cardText}>Donate</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.cards}>
            <TouchableOpacity onPress={() => setActiveCard('want')}>
              <ImageBackground
                source={handShake}
                resizeMode="cover"
                style={styles.img}
              >
                <Text style={styles.cardText}>Request</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.cards}>
            <TouchableOpacity onPress={() => setActiveCard('myrec')}>
              <ImageBackground
                source={mascot}
                resizeMode="cover"
                style={styles.img}
              >
                <Text style={styles.cardText}>My Records</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {renderContent()}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cards: {
    margin: 20,
    alignItems: 'center',
  },
  img: {
    width: 300,
    height: 200,
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // optional overlay for readability
  },
  detail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    fontSize: 20,
    color: 'blue',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android elevation
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // ensures text starts at the top
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
