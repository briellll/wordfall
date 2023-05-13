import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

const image = require('../../../assets/background.png');

const Settings = () => {
  const [volume, setVolume] = useState(50);

  const handleVolumeIncrease = () => {
    setVolume(volume + 10);
  };

  const handleVolumeDecrease = () => {
    setVolume(volume - 10);
  };

  return (
    <ImageBackground source={require('../../../assets/background.png')} style={{flex: 1, resizeMode: "cover"}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <Text style={{ fontSize: 24, color: '#FFF' }}>Configurações de Volume</Text>
        <Text style={{ fontSize: 16, color: '#FFF' }}>Volume atual: {volume}</Text>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity style={{ backgroundColor: '#F15A24', padding: 10, borderRadius: 10, marginRight: 10 }} onPress={handleVolumeDecrease}>
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20 }}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#F15A24', padding: 10, borderRadius: 10, marginRight: 10 }} onPress={handleVolumeIncrease}>
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Settings;

