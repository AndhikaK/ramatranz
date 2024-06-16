import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

import { Appbar, View } from "@/components";
import { useHardwareBackpress } from "@/hooks/useHardwareBackPress";

export default function PaymentStatusScreen() {
  const router = useRouter();
  const navigation = useNavigation<any>();

  const params = useLocalSearchParams<{ id: string }>();
  console.log(params);

  const handleOnBackPress = () => {
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];

    if (prevRoute.name === "travel/payment") {
      navigation.reset({
        index: 0,
        routes: [{ name: "(authenticated)" }],
      });
    } else {
      router.back();
    }
  };

  useHardwareBackpress(handleOnBackPress);

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar title="Status Pembayaran" backIconPress={handleOnBackPress} />

      <View style={styles.contentContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});
