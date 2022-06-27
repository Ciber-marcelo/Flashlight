import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LampadaOn from './assets/icons/lampada_1.png';
import LampadaOff from './assets/icons/lampada_2.png';
import LuzOn from './assets/icons/luz_1.png';
import LuzOff from './assets/icons/luz_2.png';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

export default function App() {
  const [toggle, setToggle] = useState(false);

  useEffect(()=>{
    //liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(()=>{
    //quando o celular for chacoalhado, muda o toggle
    const subscription = RNShake.addListener(()=>{
      setToggle(!toggle)
    });

    //essa função vai ser chamada quando o componente for ser desmontado
    return ()=> subscription.remove();
  },[])

  return (
    <View style={toggle ? styles.containerLight : styles.container}>
      <TouchableOpacity 
        onPress={() => 
          {setToggle(!toggle)}
        }>

        <Image style={toggle ? styles.lightingOn : styles.lightingOff}
          source={toggle ? LampadaOn : LampadaOff}
        />

        <Image style={styles.logo}
          source={toggle ? LuzOn : LuzOff}
        />
      </TouchableOpacity>
      <StatusBar style={toggle ? 'dark' : 'light'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'center',
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  lightingOff: {
    resizeMode: 'center',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150
  },
  logo: {
    // resizeMode: 'center',
    alignSelf: 'center',
    width: 222,
    height: 68,
    marginTop: 40,
    // backgroundColor: 'red'
  },
});
