import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { medicines } from '../../../data/medicines';

export default function MedicineDetail() {
  const { id } = useLocalSearchParams();
  const med = medicines.find((m) => m.id === id);
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{med?.name}</Text>
    </View>
  );
}