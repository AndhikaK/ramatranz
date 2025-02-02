import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Appbar, Button, TextInput, View } from "@/components";
import {
  useTravelActions,
  useTravelPassenger,
} from "@/features/travel/store/travel-store";
import { useHardwareBackpress } from "@/hooks/useHardwareBackPress";
import { zodResolver } from "@hookform/resolvers/zod";

export const passengerSeatSchema = z.object({
  name: z.string(),
  nik: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  seat: z.string().array().default([]),
});
export type PassengerSeat = z.infer<typeof passengerSeatSchema>;

export default function AddPassengerScreen() {
  const router = useRouter();

  // store
  const passengerList = useTravelPassenger();
  const { setPassenger } = useTravelActions();

  const { control, formState, handleSubmit } = useForm<PassengerSeat>({
    resolver: zodResolver(passengerSeatSchema),
    mode: "all",
  });

  const onSavePassenger = handleSubmit((data) => {
    const tempPassenger = [...passengerList, data];
    setPassenger(tempPassenger);
    onBackPress();
  });

  const onBackPress = () => {
    router.replace("/travel/order-detail");
  };
  useHardwareBackpress(onBackPress);

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar title="Tambah Penumpang" backIconPress={onBackPress} />

      <View borderColor="outlineborder" style={styles.contentContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              label="Nama *"
              placeholder="Nama"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="nik"
          render={({ field }) => (
            <TextInput
              label="NIK *"
              placeholder="NIK"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              label="Email *"
              placeholder="Email"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <TextInput
              label="Nomor Telepon *"
              placeholder="Nomor Telepon"
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
            />
          )}
        />

        <View style={styles.buttonWrapper}>
          <Button
            onPress={onSavePassenger}
            disabled={!formState.isValid}
            style={{ height: 40, minHeight: 40 }}
          >
            Simpan
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 60,
    marginHorizontal: 24,
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
    gap: 16,
  },
  buttonWrapper: {
    alignItems: "center",
  },
});
