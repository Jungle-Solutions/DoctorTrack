import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Home() {
  const [text, setText] = useState('');
  const [selectedActivity, setSelectedActivity] = useState("clinica medica"); // Set an initial value

  const onChangeText = (value) => {
    setText(value);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-doctrack.png")}
        style={styles.logo}
      />

      <Picker
        style={styles.pickerComponent}
        selectedValue={selectedActivity}
        onValueChange={(itemValue, itemIndex) => setSelectedActivity(itemValue)}
      >
        <Picker.Item label="Selecione a especialidade" value="" enabled={false} style={{ color: 'gray' }} />
        <Picker.Item label="Clínica Médica" value="clinica medica" />
        <Picker.Item label="Cirurgia" value="cirurgia" />
        <Picker.Item label="Pediatria" value="pediatria" />
        <Picker.Item label="Ginecologia e Obstetrícia" value="ginecologia e obstetricia" />
        <Picker.Item label="Psiquiatria" value="psiquiatria" />
        <Picker.Item label="Medicina de Família e Comunidade" value="medicina de familia e comunidade" />
      </Picker>

      <TextInput
        style={{ height: 200, width: 200, ...styles.textinput, fontStyle: 'normal' }} // Use fontStyle instead of fontWeight
        placeholder='Atividade'
        onChangeText={onChangeText}
        value={text}
        multiline={true}
        numberOfLines={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 60,
  },
  textinput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  pickerComponent: {
    width: 350,
  },
});