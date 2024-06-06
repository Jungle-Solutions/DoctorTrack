import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { specialtiesArray } from '../../constants/data';
import { StyleSheet, View } from 'react-native';

export default function PickerComponent({selectedActivity, setSelectedActivity}) {

  return (
    <View style={styles.pickerWrapper}>
      <Picker
        style={styles.pickerComponent}
        selectedValue={selectedActivity}
        onValueChange={(itemValue, itemIndex) => setSelectedActivity(itemValue)}
      >
        {specialtiesArray.map((specialty, index) => (
          <Picker.Item
            label={specialty.label}
            value={specialty.value}
            key={index}
            enabled={index > 0}
            style={index === 0 ? styles.disabledItem : styles.enabledItem}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 40,
    elevation: 3,
  },
  pickerComponent: {
    width: '100%',
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  disabledItem: {
    color: 'gray',
    fontSize: 16,
  },
  enabledItem: {
    color: '#333',
    fontSize: 16,
  },
});
