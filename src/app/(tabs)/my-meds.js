import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { medicines } from '../../../data/medicines';
import { useMeds } from '../../../context/MedsContext';
import MedicineCard from '../../../components/MedicineCard';

export default function MyMedsScreen() {
  const router = useRouter();
  const { favorites } = useMeds();
  const saved = medicines.filter((m) => favorites.includes(m.id));
  return (
    <View style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicineCard
            item={item}
            onPress={() => router.push(`/medicine/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nothing saved yet. Tap the heart on a medicine to add it here.
          </Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f4f6f8' },
  empty: { textAlign: 'center', marginTop: 40, color: '#777' },
});