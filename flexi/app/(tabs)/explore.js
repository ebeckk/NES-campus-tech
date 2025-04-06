import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TextInput } from 'react-native';


const SettingsScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flexiAmount, setFlexiAmount] = useState('50.00'); // default test value

  return (
    <View style={styles.container}>
      {/* 🧑 Avatar Box */}
      <Image
        source={{ uri: 'https://s.hdnux.com/photos/01/34/15/02/24170637/4/1920x0.jpg' }}
        style={styles.avatar}
      />

      {!isLoggedIn ? (
        <>
          {/* 🔓 Login Section */}
          <Button title="Login" onPress={() => setIsLoggedIn(true)} />
        </>
      ) : (
        <>
          {/* 👤 Profile Display */}
          <Text style={styles.sectionTitle}>👤 My Profile</Text>
          <Text style={styles.label}>Name: Jane Doe</Text>
          <Text style={styles.label}>Email: jane@university.edu</Text>

          {/* 💵 Flexi Amount Input */}
          <Text style={styles.sectionTitle}>💵 My Flexi</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={flexiAmount}
            onChangeText={setFlexiAmount}
          />

          {/* 🔒 Logout Button */}
          <View style={styles.logout}>
            <Button title="Logout" color="crimson" onPress={() => setIsLoggedIn(false)} />
          </View>
        </>
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
  },
  input: {
    width: '80%',
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  logout: {
    marginTop: 30,
    width: '60%',
  },
});
