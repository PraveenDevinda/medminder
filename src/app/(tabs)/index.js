import { useState } from 'react';
import { View, Text, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { medicines, categories } from '../../data/medicines';
import MedicineCard from '../../components/MedicineCard';

export default function MedicinesScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const data =
    filter === 'All' ? medicines : medicines.filter((m) => m.category === filter);
  return (
    <View style={styles.container}>
      <Pressable style={styles.filterBtn} onPress={() => setShowFilter(true)}>
        <Ionicons name="filter" size={18} color="#fff" />
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
  container: { flex: 1, padding: 12, backgroundColor: '#f4f6f8' },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    backgroundColor: '#0a7ea4', paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 20, marginBottom: 12,
  },
  filterText: { color: '#fff', marginLeft: 6, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, color: '#777' },
  overlay: {
    flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#fff', padding: 20,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  option: { padding: 12, borderRadius: 8 },
  optionActive: { backgroundColor: '#0a7ea4' },
  optionText: { fontSize: 16 },
  optionTextActive: { fontSize: 16, color: '#fff' },
  close: { textAlign: 'center', marginTop: 12, color: '#e63946', fontSize: 16 },
});