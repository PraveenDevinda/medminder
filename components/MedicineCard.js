import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMeds } from '../context/MedsContext';

export default function MedicineCard({ item, onPress }) {
  const { isFavorite, toggleFavorite } = useMeds();
  const fav = isFavorite(item.id);
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text numberOfLines={2} style={styles.desc}>{item.usedFor}</Text>
         </View>
      <Pressable onPress={() => toggleFavorite(item)} hitSlop={10}>
        <Ionicons
          name={fav ? 'heart' : 'heart-outline'}
          size={26}
          color={fav ? '#e63946' : '#888'}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, padding: 10, marginBottom: 10, elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  category: { fontSize: 12, color: '#0a7ea4', marginBottom: 2 },
  desc: { fontSize: 13, color: '#555' },
});