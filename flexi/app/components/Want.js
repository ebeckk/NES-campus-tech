import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default function Want() {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [requests, setRequests] = useState([]);

  const handleSubmit = async () => {
    const payload = {
      amount: parseInt(amount),
      note: note,
    };

    try {
      const response = await fetch('http://localhost:8000/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Request submitted:', data);
        setAmount('');
        setNote('');
        fetchRequests(); // refresh the list
      } else {
        console.error('Submission failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:8000/requests');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Flexi</Text>

      <TextInput
        style={styles.input}
        placeholder="Amount ($)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add a note"
        multiline={true}
        numberOfLines={4}
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>All Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text style={styles.requestText}>Note: {item.note}</Text>
            <Text style={styles.requestText}>Amount: ${item.amount}</Text>
            <Text style={styles.requestStatus}>Status: {item.status}</Text>
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
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  requestItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  requestText: {
    fontSize: 16,
  },
  requestStatus: {
    color: '#666',
    marginTop: 4,
  },
});
