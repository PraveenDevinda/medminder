import { useState } from 'react';
import { View, Text, FlatList, Pressable, Modal, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { medicines, categories } from '../../../data/medicines';
import MedicineCard from '../../../components/MedicineCard';
import { colors } from '../../../constants/theme';

export default function MedicinesScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [query, setQuery] = useState('');
  const data = medicines.filter(
  (m) =>
    (filter === 'All' || m.category === filter) &&
    m.name.toLowerCase().includes(query.trim().toLowerCase())
);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search medicines..."
        placeholderTextColor={colors.muted}
        value={query}
        onChangeText={setQuery}
      />
      <Pressable style={styles.filterBtn} onPress={() => setShowFilter(true)}>
        <Ionicons name="filter" size={18} color={colors.card} />
        <Text style={styles.filterText}>Filter: {filter}</Text>
      </Pressable>

       <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicineCard
            item={item}
            onPress={() => router.push(`/medicine/${item.id}`)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No medicines found.</Text>}
      />

       <Modal
        visible={showFilter}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilter(false)}
      >

        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Choose a category</Text>
            {categories.map((c) => (
              <Pressable key={c}
                style={[styles.option, c === filter && styles.optionActive]}
                onPress={() => {
                  setFilter(c);
                  setShowFilter(false);
                }}
              >
                <Text style={c === filter ? styles.optionTextActive : styles.optionText}>
                  {c}
                </Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setShowFilter(false)}>
              <Text style={styles.close}>Cancel</Text>
            </Pressable>
            </View>
        </View>
      </Modal>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: colors.bg },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    backgroundColor: colors.primary, paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 20, marginBottom: 12,
  },
  filterText: { color: colors.card, marginLeft: 6, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, color: colors.muted },
  overlay: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: colors.card, padding: 20,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  option: { padding: 12, borderRadius: 8 },
  optionActive: { backgroundColor: colors.primary },
  optionText: { fontSize: 16 },
  optionTextActive: { fontSize: 16, color: colors.card },
  close: { textAlign: 'center', marginTop: 12, color: colors.danger, fontSize: 16 },
   search: {
    backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 14,
    paddingVertical: 10, marginBottom: 10, borderWidth: 1, borderColor: '#dde3ea',
  },
});