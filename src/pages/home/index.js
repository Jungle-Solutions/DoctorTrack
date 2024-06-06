import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import PickerComponent from '../../components/Picker/Picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [text, setText] = useState('');
  const [selectedActivity, setSelectedActivity] = useState();
  const navigation = useNavigation();

  const onChangeText = (value) => {
    setText(value);
  };

  const handleStartActivity = (text, selectedActivity) => {
    if (!text || !selectedActivity) {
      return;
    }
    setText('');
    setSelectedActivity(null);
    navigation.navigate('Register', { text, selectedActivity });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView  showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Bem vindo(a) ao DocTrack</Text>
        <Text style={styles.subtitle}>Sistema de Ponto Eletrônico para Médicos</Text>
        <Image
          source={require('../../assets/logo-doctrack.png')}
          style={styles.logo}
        />
        <PickerComponent selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
        <Text style={styles.label}>Descrição da Atividade:</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Digite a atividade realizada..."
          onChangeText={onChangeText}
          value={text}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleStartActivity(text, selectedActivity)}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Marcar Ponto</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Obrigado por usar nosso sistema!</Text>
      </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollView:{
    paddingTop: 90,
    flex: 1,
    backgroundColor: '#F3F3FF',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',

  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    marginTop: 30,
  },
  textinput: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c8785',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
});
