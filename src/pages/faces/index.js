import {View, Text, StyleSheet} from 'react-native';

export default function Faces() {
    return(
    <View style={styles.container}>
        <Text>Teste</Text>

    </View>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F3FF',
      alignItems: 'center',
      justifyContent: 'center',
    }})