import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function Register({ route }) {
  const navigation = useNavigation();
  const { text, selectedActivity } = route.params;
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
  
        let result = await Location.getCurrentPositionAsync({});
        setLocation(result);
  
        if (result) {
          await getAddressFromCoordinates(result.coords.latitude, result.coords.longitude);
        }
        const interval = setInterval(() => {
          const now = new Date();
          setCurrentDateTime(now.toLocaleString());
        }, 1000);
  
        setLoading(false);
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    })();
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${'AIzaSyAgK75wqN4OrCyH-N-sYPXkx4Gd8EEWFrI'}`
      );
      if (!response.ok) {
        console.log('Failed to fetch address');
      }
      let json = await response.json();
      if (json.results && json.results.length > 0) {
        setAddress(json.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  const handleConfirmActivity = async (selectedActivity, text, address, currentDateTime) => {
    if (!selectedActivity || !text || !address || !currentDateTime) {
      return;
    }
  
    const point = {
      id: Math.random().toString(36).substring(7),
      selectedActivity,
      text,
      address,
      currentDateTime,
      finishedAt: '',
      finished: false,
    };
  
    let pointsList = await AsyncStorage.getItem('points');
    pointsList = pointsList ? JSON.parse(pointsList) : [];
  
    pointsList.push(point);
  
    await AsyncStorage.setItem('points', JSON.stringify(pointsList));
  
    navigation.navigate('Confirm', { pointId: point.id, selectedActivity, text, address, currentDateTime, point });
    console.log('Ponto confirmado:', point);
  };
  
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1,backgroundColor: '#F3F3FF',}}>
{loading ? (
  <View style={styles.container}>
    <Text style={styles.title}>Buscando informações...</Text>
    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>Por favor, aguarde...</Text>
    <Ionicons name="hourglass" size={32} color="#1c8785" style={{ marginTop: 20 }} />
  </View>
) : (  <View style={styles.container}>
      <Text style={styles.title}>Registro de Atividade</Text>
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Ionicons name="calendar" size={32} color="#1c8785" style={styles.icon} />
          <Text style={styles.label}> Atividade: <Text style={{fontWeight: 'bold'}}> {selectedActivity}</Text></Text>
        </View>
        <View style={styles.fieldContainer}>
          <Ionicons name="clipboard" size={32} color="#1c8785" style={styles.icon} />
          <Text style={styles.label}>Descricão: <Text style={{fontWeight: 'bold'}}>{text}</Text></Text>
        </View>
        {location && (
          <>
            {address && (
              <View style={styles.fieldContainer}>
                <Ionicons name="location-sharp" size={32} color="#1c8785" style={styles.icon} />
                <Text style={styles.label}>Endereço: <Text style={{fontWeight: 'bold'}}>{address}</Text></Text>
              </View>
            )}
             <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Localização Atual"
              description="Aqui você está!"
            />
          </MapView>
          </>
        )}
        {currentDateTime && (
        <View style={styles.dateTimeContainer}>
          <Ionicons name="hourglass" size={32} color="#1c8785" style={styles.icon} />
          <Text style={styles.dateTimeText}>Data e Horário: <Text style={{fontWeight: 'bold'}}>{currentDateTime}</Text></Text>
        </View>
      )}
      </View>
     
    <TouchableOpacity style={styles.button} onPress={() => handleConfirmActivity(selectedActivity, text, address, currentDateTime)}>
      <Text style={styles.buttonText}>Confirmar Ponto</Text>
    </TouchableOpacity>
    </View> )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  formContainer: {
    width: '100%',
    marginVertical: 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    width: '80%',
    lineHeight: 30,
    marginVertical: 5,
    color: '#666',
  },
  dateTimeContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3FF',
  },
  button: {
    backgroundColor: '#1c8785',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
