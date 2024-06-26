import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Faces() {
  const [points, setPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      setIsLoading(true);
      const storedPoints = await AsyncStorage.getItem('points');
      if (storedPoints) {
        const parsedPoints = JSON.parse(storedPoints).filter(point => !point.finished); 
        setPoints(parsedPoints.reverse());
        console.log('Points fetched successfully:', parsedPoints);
      }
    } catch (error) {
      console.error('Error fetching points:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Ionicons name="alert-circle-outline" size={32} color="#e74c3c" style={styles.icon} />
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>Atividade: {item.selectedActivity}</Text>
        <Text style={styles.cardText}>Descrição: {item.text}</Text>
        <Text style={styles.cardText}>Endereço: {item.address}</Text>
        <Text style={styles.cardText}>Iniciado em: {item.currentDateTime}</Text>
        <Text style={styles.cardText}>Finalizado em: {item.finishedAt}</Text>
        <Text style={styles.cardText}>Verificado: {item.finished ? 'Sim' : 'Não'}</Text>
      </View>
    </View>
  );

  const handleVerifyPoints = async () => {
    
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#1c8785" style={{ marginTop: 80 }} />
      ) : points.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad" size={48} color="#1c8785" style={styles.icon} />
          <Text style={styles.emptyText}>Nenhum ponto pendente.</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Pontos Pendentes</Text>
          <FlatList
            data={points}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleVerifyPoints()}
            >
            <Text style={styles.buttonText}>Verificar Pendências</Text>
            </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#1c8785',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    marginVertical: 10,
  },
  icon: {
    marginRight: 15,
  },
  button: {
    backgroundColor: '#1c8785',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
