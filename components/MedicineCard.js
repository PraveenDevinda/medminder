import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMeds } from '../context/MedsContext';
import { colors } from '../constants/theme';

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
          color={fav ? colors.danger : colors.muted}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
   card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: 14, padding: 12, marginBottom: 12,
    borderLeftWidth: 4, borderLeftColor: colors.primary,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  category: { 
    fontSize: 11, color: colors.primary,  backgroundColor: colors.primaryLight, 
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginVertical: 3 
  },
  desc: { fontSize: 13, color: colors.muted },
});