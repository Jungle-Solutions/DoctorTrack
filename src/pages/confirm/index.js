import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Confirm({ route }) {
  const { selectedActivity, text, address, currentDateTime, point } = route.params;
  const [finishedTime, setFinishedTime] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setFinishedTime(now.toLocaleString());
    }, 1000);
    const getPointById = async () => {
      const pointsList = await AsyncStorage.getItem('points');
      const points = pointsList ? JSON.parse(pointsList) : [];
      const foundPoint = points.find(p => p.id === point.id);
      setPoint(foundPoint);
    };

    getPointById();
    
    return () =>{ 
      clearInterval(interval)
    };
  }, []);
  

  const handleUpdatePoint = async () => {
    try {
      let pointsList = await AsyncStorage.getItem('points');
      pointsList = pointsList ? JSON.parse(pointsList) : [];
      const updatedPointsList = pointsList.map(item => {
        if (item.id === point.id) {
          return {
            ...item,
            selectedActivity: point.selectedActivity,
            text: point.text,
            address: point.address,
            currentDateTime: point.currentDateTime,
            finishedAt: finishedTime,
          };
        } else {
          return item;
        }
      });

      await AsyncStorage.setItem('points', JSON.stringify(updatedPointsList));

      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Error updating point:', error);
    }
  };

  if (!point) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Registro de Atividade Confirmado!</Text>
      <Ionicons name="checkbox" size={80} color="#1c8785" style={{ marginTop: 20 }} />
      
      <Text style={styles.title}>Atividade: {selectedActivity}</Text>
      <Text style={styles.title}>Descricão: {text}</Text>
      <Text style={styles.title}>Endereço: {address}</Text>
      <Text style={styles.title}>Data e Hora de Início: {currentDateTime}</Text>
      <Text style={[styles.title, { backgroundColor: '#1c8785', color: '#fff', borderRadius: 10, padding: 10 }]}>Data e Hora de conclusão: {finishedTime}</Text>

      <TouchableOpacity onPress={()=>handleUpdatePoint()} style={{ marginTop: 80, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#992323', borderRadius: 10, }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Encerrar expediente</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    width: '70%',
    textAlign: 'center',
  },
});

