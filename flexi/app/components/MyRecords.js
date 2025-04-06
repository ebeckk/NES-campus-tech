import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const MyRecords = () => {
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersRes, requestsRes] = await Promise.all([
          fetch('http://localhost:8000/offers'),
          fetch('http://localhost:8000/requests')
        ]);

        const offersData = await offersRes.json();
        const requestsData = await requestsRes.json();

        setOffers(offersData);
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Offers</Text>
      {offers.map((offer) => (
        <View key={offer.id} style={styles.item}>
          <Text style={styles.label}>Message:</Text>
          <Text>{offer.message}</Text>
          <Text style={styles.status}>Status: {offer.status}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Requests</Text>
      {requests.map((req) => (
        <View key={req.id} style={styles.item}>
          <Text style={styles.label}>Note:</Text>
          <Text>{req.note}</Text>
          <Text style={styles.status}>Amount: ${req.amount}</Text>
          <Text style={styles.status}>Status: {req.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default MyRecords;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  status: {
    color: '#555',
  },
});
