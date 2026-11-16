import { Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { medicines } from '../../../data/medicines';
import { useMeds } from '../../../context/MedsContext';
import { colors } from '../../../constants/theme';

export default function MedicineDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useMeds();
  const med = medicines.find((m) => m.id === id);
  if (!med) return <Text style={{ padding: 16 }}>Medicine not found.</Text>;
  const fav = isFavorite(med.id);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: med.image }} style={styles.image} />
      <Text style={styles.name}>{med.name}</Text>
      <Text style={styles.category}>{med.category}</Text>
      <Text style={styles.heading}>Used for</Text>
      <Text style={styles.body}>{med.usedFor}</Text>
      <Text style={styles.heading}>Precautions</Text>
      <Text style={styles.body}>{med.precautions}</Text>
      <Text style={styles.disclaimer}>
        General information only. Always ask a doctor or pharmacist before taking any medicine.
      </Text>
      <Pressable style={styles.btn} onPress={() => toggleFavorite(med)}>
        <Text style={styles.btnText}>
          {fav ? 'Remove from My Meds' : 'Add to My Meds'}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.btn, styles.btnAlt]}
        onPress={() =>
          router.push({ pathname: '/medicine/add-reminder', params: { medId: med.id } })
        }
      >
        <Text style={styles.btnAltText}>Set Reminder</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.bg, flexGrow: 1,},
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 12 },
  name: { fontSize: 24, fontWeight: 'bold'},
  category: { color: colors.primary, marginBottom: 12 },
  heading: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  body: { fontSize: 15, color: colors.mutedDark, marginTop: 4 },
  disclaimer: {
    marginTop: 16, padding: 10, backgroundColor: colors.warningBg,
    borderRadius: 8, color: colors.warningText, fontSize: 13,
  },
  btn: {
    backgroundColor: colors.primary, padding: 14, borderRadius: 10,
    alignItems: 'center', marginTop: 14,
  },
    btnAlt: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary,},
    btnText: { color: colors.card, fontWeight: '700', fontSize: 16 },

    btnAltText: {color: colors.primary, fontWeight: '700', fontSize: 16},
});