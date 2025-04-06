import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import Header from '../components/Header';
import Want from '../components/Want';
import MyRec from '../components/MyRecords';
import Give from '../components/Give';
import foodbk from '@/assets/images/food.jpg';
import handShake from '@/assets/images/handshake.webp';
import mascot from '@/assets/images/donsMascot.jpg';

const App = () => {
  const [activeCard, setActiveCard] = useState(null);

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
          <Give />
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
      // Home view with all cards
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
});
