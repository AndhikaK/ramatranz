import { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  TravelScheduleQuery,
  travelScheduleQuerySchema,
} from "@/apis/internal.api.type";
import {
  Appbar,
  Button,
  DateInputV2,
  SelectInputV2,
  Separator,
  Typography,
  View,
} from "@/components";
import { IconCalendar, IconCarSide, IconSwap } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetTravelBranch } from "@/features/travel/api/useGetTravelBranch";
import { useTravelActions } from "@/features/travel/store/travel-store";
import { formatDate } from "@/utils/datetime";
import { zodResolver } from "@hookform/resolvers/zod";

export default function BookingTravelScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { Colors } = useAppTheme();

  const { setBookingPayload } = useTravelActions();

  const travelBranchQuery = useGetTravelBranch();

  const branchList = useMemo(() => {
    if (!travelBranchQuery.data) return [];
    return travelBranchQuery.data?.data.map((item) => ({
      title: item.nama,
    }));
  }, [travelBranchQuery.data]);

  const { control, formState, handleSubmit } = useForm<TravelScheduleQuery>({
    defaultValues: {
      date: new Date(),
    },
    resolver: zodResolver(travelScheduleQuerySchema),
    mode: "all",
  });

  const handleSubmitForm = handleSubmit((data) => {
    setBookingPayload(data);
    router.push("/travel/available-schedule");
  });

  useEffect(() => {
    setBookingPayload(undefined);
  }, [setBookingPayload]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
    >
      <View
        backgroundColor="main"
        style={[style.headerBack, { height: insets.top + 106 }]}
      />

      <Appbar
        title="Travel"
        backgroundColor="transparent"
        hasBorder={false}
        colorSheme="dark"
        backIconPress={() => router.back()}
        variant="light"
      />

      <View
        backgroundColor="paper"
        style={[style.orderBox, { borderColor: Colors.outlineborder }]}
      >
        <View
          style={[style.destinationBox, { borderColor: Colors.outlineborder }]}
        >
          <Controller
            control={control}
            name="from"
            render={({ field }) => (
              <SelectInputV2
                placeholder="Berangkat dari..."
                value={field.value}
                data={branchList}
                onSelect={(selectedItem) => field.onChange(selectedItem.title)}
                leadingIcon={
                  <View>
                    <Typography fontFamily="OpenSans-Regular" fontSize={10}>
                      Dari
                    </Typography>
                    <IconCarSide width={21} height={21} color="main" />
                  </View>
                }
                withBorder={false}
              />
            )}
          />
          <Separator />
          <Controller
            control={control}
            name="to"
            render={({ field }) => (
              <SelectInputV2
                placeholder="Menuju..."
                value={field.value}
                data={branchList}
                onSelect={(selectedItem) => field.onChange(selectedItem.title)}
                leadingIcon={
                  <View>
                    <Typography fontFamily="OpenSans-Regular" fontSize={10}>
                      Ke
                    </Typography>
                    <View style={{ transform: [{ scaleX: -1 }] }}>
                      <IconCarSide width={21} height={21} color="main" />
                    </View>
                  </View>
                }
                withBorder={false}
              />
            )}
          />

          <View backgroundColor="main" style={style.destinationIconSwap}>
            <IconSwap width={20} height={20} color="paper" />
          </View>
        </View>

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DateInputV2
              placeholder={formatDate(new Date())}
              leadingIcon={<IconCalendar width={21} height={21} color="main" />}
              onChange={(date) => field.onChange(date)}
              value={field.value}
            />
          )}
        />

        <Button disabled={!formState.isValid} onPressIn={handleSubmitForm}>
          Cari
        </Button>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  headerBack: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  orderBox: {
    margin: 24,
    marginTop: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderRadius: 2,
  },
  destinationBox: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
    gap: 12,
    justifyContent: "center",
  },
  destinationIconSwap: {
    height: 40,
    width: 40,
    borderRadius: 99,
    position: "absolute",
    right: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
