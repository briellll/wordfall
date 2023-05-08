import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Settings = () => {
  const [volume, setVolume] = useState(50);

  const handleVolumeIncrease = () => {
    setVolume(volume + 10);
  };

  const handleVolumeDecrease = () => {
    setVolume(volume - 10);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Configurações de Volume</Text>
      <Text style={{ fontSize: 16 }}>Volume atual: {volume}</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <View style={{ marginRight: 10 }}>
          <Button title="-" onPress={handleVolumeDecrease} />
        </View>
        <View style={{ marginRight: 10 }}>
          <Button title="+" onPress={handleVolumeIncrease} />
        </View>

      </View>
    </View>
  );
};

export default Settings;
