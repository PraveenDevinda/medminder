import { View, Text } from 'react-native';
import { medicines } from '../../data/medicines';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{medicines.length} medicines loaded</Text>
    </View>
  );
}