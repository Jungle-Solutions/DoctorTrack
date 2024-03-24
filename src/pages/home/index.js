import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput,} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export function Home() {
  const [text, setText] = useState('');
  const [selectedActivity, setSelectedActivity] = useState();
  const onChangeText = (value) => {
    setText(value);
  };

  const specialties = [
    { label: "Clínica Médica", value: "clinica medica" },
    { label: "Cirurgia", value: "cirurgia" },
    { label: "Pediatria", value: "pediatria" },
    { label: "Ginecologia e Obstetrícia", value: "ginecologia e obstetricia" },
    { label: "Psiquiatria", value: "psiquiatria" },
    { label: "Medicina de Família e Comunidade", value: "medicina de familia e comunidade" },
  ];

  const specialtiesArray = [
    { label: "Selecione a Especialidade", value: "selecione a especialidade", enabled: false, style: { color: "gray" } },
    ...specialties.map((specialty, index) => specialty),
  ];

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
        {specialtiesArray.map((specialty, index) => (
          <Picker.Item label={specialty.label} value={specialty.value} key={index} enabled={index > 0} style={index === 0 ? { color: "gray" } : {}} />
        ))}
      </Picker>

     <TextInput
    style={{ height: 200, width: 200, ...styles.textinput, fontWeight: 'normal' }}
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
