import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Typography } from '@/components/typography/Typography';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/test')}>
        <Typography>Goto that one</Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
