import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Header from '../components/Header';
import Give from '../components/Give';
import Want from '../components/Want';
import MyRec from '../components/MyRecords';
import foodbk from '@/assets/images/food.jpg'
import handShake from '@/assets/images/handshake.webp'
import mascot from '@/assets/images/donsMascot.jpg'
const App = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <View style={styles.cards}>
          <ImageBackground
            source={foodbk}
            resizeMode='cover'
            style={styles.img}
          >
            <Give></Give>

          </ImageBackground>
        </View>

        <View style={styles.cards}>
          <ImageBackground
            source={handShake}
            resizeMode='cover'
            style={styles.img}
          >
            <Want></Want>

          </ImageBackground>
        </View>
        <View style={styles.cards}>
          <ImageBackground
            source={mascot}

            resizeMode='cover'
            style={styles.img}

          >
            <MyRec></MyRec>

          </ImageBackground>
        </View>
      </View>
    </View >
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',


  },
  cards: {
    flex: 3,
    margin: 20,
    alignItems: 'center',
    alignContent: 'center',



  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    justifyContent: 'center',
  }

});
