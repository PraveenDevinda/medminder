import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useMeds } from '../../../context/MedsContext';
import { cancelReminder, sendInstantNotification } from '../../../utils/notifications';

export default function RemindersScreen() {
  const { reminders, removeReminder, lastResumed, resumeCount } = useMeds();
  const handleDelete = async (id) => {
    await cancelReminder(id);
    removeReminder(id);
  };

  return (
    <View style={styles.container}>
      {lastResumed && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Welcome back! App resumed at {lastResumed} (times resumed: {resumeCount})
          </Text>
        </View>
      )}
      <Pressable
        style={styles.testBtn}
        onPress={() =>
          sendInstantNotification('Test notification', 'Local notifications work!')
        }
      >
        <Text style={styles.testText}>Send test notification</Text>
      </Pressable>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.medName}</Text>
              <Text style={styles.time}>{item.label}</Text>
            </View>
            <Pressable onPress={() => handleDelete(item.id)}>
              <Text style={styles.del}>Delete</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No reminders yet. Open a medicine and tap Set Reminder.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f4f6f8' },
  banner: {
    backgroundColor: '#e0f7fa', padding: 10, borderRadius: 8, marginBottom: 10,
  },
  bannerText: { color: '#006064' },
  testBtn: {
    backgroundColor: '#0a7ea4', padding: 12, borderRadius: 10,
    alignItems: 'center', marginBottom: 12,
  },
  testText: { color: '#fff', fontWeight: '600' },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 8,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  time: { color: '#555' },
  del: { color: '#e63946', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, color: '#777' },
});