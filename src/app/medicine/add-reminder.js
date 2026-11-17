
import { useState } from 'react';
import {View, Text, Pressable, StyleSheet, Alert, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { medicines } from '../../../data/medicines';
import { useMeds } from '../../../context/MedsContext';
import {scheduleDaily, scheduleAtDate} from '../../../utils/notifications';
import { colors } from '../../../constants/theme';

export default function AddReminder() {
  const { medId } = useLocalSearchParams();
  const router = useRouter();
  const { addReminder } = useMeds();
  const med = medicines.find((m) => m.id === medId);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [frequency, setFrequency] = useState('daily');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const save = async () => {
    if (!med) {
      Alert.alert('Error', 'Medicine not found.');
      return;
    }

    const reminderDate = new Date(selectedDate);
    reminderDate.setHours(
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      0,
      0
    );

    if (frequency === 'once' && reminderDate <= new Date()) {
      Alert.alert('Invalid date', 'Please select a future date and time.');
      return;
    }

    try {
      const title = 'Time to take your medicine';
      const body = `Reminder: ${med.name}`;

      const notificationId =
        frequency === 'daily'
          ? await scheduleDaily(
              title,
              body,
              selectedTime.getHours(),
              selectedTime.getMinutes()
            )
          : await scheduleAtDate(title, body, reminderDate);

      const label =
        frequency === 'daily'
          ? `Every day at ${selectedTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`
          : `${reminderDate.toLocaleDateString()} at ${selectedTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}`;

      addReminder({
        id: notificationId,
        medName: med.name,
        label,
      });

      Alert.alert('Success', 'Reminder saved successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Could not save the reminder.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remind me to take</Text>
      <Text style={styles.med}>{med?.name}</Text>

      <Text style={styles.heading}>Choose reminder time</Text>

      <Pressable
        style={styles.option}
        onPress={() => setShowTimePicker(!showTimePicker)}
      >
        <Text style={styles.optionText}>
          {selectedTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text style={styles.link}>Change time</Text>
      </Pressable>

      {showTimePicker && (
        <View>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => {
              if (Platform.OS === 'android') {
                setShowTimePicker(false);
              }
              if (date) setSelectedTime(date);
            }}
          />
          {Platform.OS === 'ios' && (
            <Pressable onPress={() => setShowTimePicker(false)}>
              <Text style={styles.done}>Done</Text>
            </Pressable>
          )}
        </View>
      )}

      <Text style={styles.heading}>Repeat</Text>

      <Pressable
        style={[
          styles.option,
          frequency === 'daily' && styles.active,
        ]}
        onPress={() => setFrequency('daily')}
      >
        <Text
          style={[
            styles.optionText,
            frequency === 'daily' && styles.activeText,
          ]}
        >
          Every day
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          frequency === 'once' && styles.active,
        ]}
        onPress={() => setFrequency('once')}
      >
        <Text
          style={[
            styles.optionText,
            frequency === 'once' && styles.activeText,
          ]}
        >
          One time
        </Text>
      </Pressable>

      {frequency === 'once' && (
        <>
          <Text style={styles.heading}>Choose date</Text>

          <Pressable
            style={styles.option}
            onPress={() => setShowDatePicker(!showDatePicker)}
          >
            <Text style={styles.optionText}>
              {selectedDate.toLocaleDateString()}
            </Text>
            <Text style={styles.link}>Change date</Text>
          </Pressable>

          {showDatePicker && (
            <View>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                minimumDate={new Date()}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, date) => {
                  if (Platform.OS === 'android') {
                    setShowDatePicker(false);
                  }
                  if (date) setSelectedDate(date);
                }}
              />
              {Platform.OS === 'ios' && (
                <Pressable onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.done}>Done</Text>
                </Pressable>
              )}
            </View>
          )}
        </>
      )}

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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.bg,
  },
  title: {
    fontSize: 14,
    color: colors.muted,
  },
  med: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  option: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: colors.card,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#dde3ea',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  active: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  activeText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
  done: {
    color: colors.primary,
    textAlign: 'right',
    fontWeight: 'bold',
    padding: 10,
  },
  save: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  cancel: {
    textAlign: 'center',
    marginTop: 14,
    color: colors.danger,
    fontSize: 16,
  },
});
