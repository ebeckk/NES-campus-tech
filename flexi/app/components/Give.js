import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';

export default function Give() {
  const [message, setMessage] = useState('');
  const [offers, setOffers] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const payload = { message };

    try {
      const response = await fetch('http://localhost:8000/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Offer submitted:', data);
        setMessage('');
        setSuccess(true);
        fetchOffers(); // refresh list
        setTimeout(() => setSuccess(false), 3000);
      } else {
        console.error('Submission failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await fetch('http://localhost:8000/offers');
      const data = await res.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate Flexi</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter your message"
        placeholderTextColor="#888"
        multiline={true}
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Offer</Text>
      </TouchableOpacity>

      {success && <Text style={styles.success}>Offer submitted successfully!</Text>}

      <Text style={styles.sectionTitle}>All Offers</Text>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.offerItem}>
            <Text style={styles.offerText}>Message: {item.message}</Text>
            <Text style={styles.offerStatus}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    color: '#000'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  success: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  offerItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  offerText: {
    fontSize: 16
  },
  offerStatus: {
    color: '#666',
    marginTop: 4
  }
});
