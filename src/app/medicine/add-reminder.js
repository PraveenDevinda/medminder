import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { medicines } from '../../../data/medicines';
import { useMeds } from '../../../context/MedsContext';
import { scheduleDaily, scheduleInSeconds } from '../../../utils/notifications';

const TIMES = [
  { label: 'In 10 seconds (demo)', seconds: 10 },
  { label: '8:00 AM every day', hour: 8, minute: 0 },
  { label: '2:00 PM every day', hour: 14, minute: 0 },
  { label: '8:00 PM every day', hour: 20, minute: 0 },
];

export default function AddReminder() {
  const { medId } = useLocalSearchParams();
  const router = useRouter();
  const { addReminder } = useMeds();
  const med = medicines.find((m) => m.id === medId);
  const [selected, setSelected] = useState(null);
  const save = async () => {
    if (selected === null) {
      Alert.alert('Please pick a time first');
      return;
    }
    const t = TIMES[selected];
    const title = 'Time to take your medicine';
    const body = `Reminder: ${med.name}`;
    const notificationId = t.seconds
      ? await scheduleInSeconds(title, body, t.seconds)
      : await scheduleDaily(title, body, t.hour, t.minute);
    addReminder({ id: notificationId, medName: med.name, label: t.label });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remind me to take</Text>
      <Text style={styles.med}>{med?.name}</Text>
      {TIMES.map((t, i) => (
        <Pressable
          key={t.label}
          style={[styles.option, selected === i && styles.active]}
          onPress={() => setSelected(i)}
        >
          <Text style={selected === i ? styles.activeText : styles.text}>
            {t.label}
          </Text>
        </Pressable>
      ))}
      <Pressable style={styles.save} onPress={save}>
        <Text style={styles.saveText}>Save Reminder</Text>
      </Pressable>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.cancel}>Cancel</Text>
      </Pressable>
    </View>
      );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6f8' },
  title: { fontSize: 14, color: '#666' },
  med: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  option: {
    padding: 14, borderRadius: 10, backgroundColor: '#fff', marginBottom: 8,
    borderWidth: 1, borderColor: '#dde3ea',
  },
  active: { backgroundColor: '#0a7ea4', borderColor: '#0a7ea4' },
  text: { fontSize: 16 },
  activeText: { fontSize: 16, color: '#fff', fontWeight: '600' },
  save: {
    backgroundColor: '#2a9d8f', padding: 14, borderRadius: 10,
    alignItems: 'center', marginTop: 12,
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  cancel: { textAlign: 'center', marginTop: 14, color: '#e63946', fontSize: 16 },
});