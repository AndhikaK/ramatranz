import { ReactNode } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Typography, View } from "@/components";
import {
  IconDoorThin,
  IconIcArrowRight,
  IconPinSharp,
} from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetTravelSchedule } from "@/features/travel/api/useGetSchedule";
import { TravelTicketItem } from "@/features/travel/components";
import { useTravelbookingPayload } from "@/features/travel/store/travel-store";
import { formatDate } from "@/utils/datetime";

export default function TravelOptionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const travelScheduleQuery = useGetTravelSchedule();

  const travelBookingPayload = useTravelbookingPayload();

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar
        title={
          <View style={style.headerWrapper}>
            <Typography
              fontFamily="Poppins-Bold"
              fontSize={16}
              style={{ flex: 1 }}
              numberOfLines={1}
            >
              {travelBookingPayload?.from}
            </Typography>
            <IconIcArrowRight height={16} width={16} />
            <Typography
              fontFamily="Poppins-Bold"
              fontSize={16}
              style={{ flex: 1 }}
              numberOfLines={1}
            >
              {travelBookingPayload?.to}
            </Typography>
          </View>
        }
        subtitle="1 Penumpang"
        backIconPress={() => router.back()}
      />
      <View style={style.contentHeaderContainer}>
        <View style={style.headerTitleWrapper}>
          <Typography fontFamily="Poppins-Bold" fontSize={14} color="main">
            {formatDate(travelBookingPayload?.date)}
          </Typography>
          <View backgroundColor="main" style={style.indicator} />
        </View>

        <View style={style.destinationOptionWrapper}>
          <TouchableWithIcon
            icon={<IconDoorThin width={20} height={20} color="main" />}
            label="Door to Door"
          />
          <TouchableWithIcon
            icon={<IconPinSharp width={20} height={20} color="main" />}
            label="Point to Point"
          />
        </View>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={() => (
          <TravelTicketItem
            availableSeat={8}
            carModel="Toyota hiace"
            carSeat={9}
            departureDate="24 Feb 2023"
            destinationCity="Lampung"
            destinationDepartureDate="24 Feb 2023"
            originCity="Palembang"
            originDepartureDate="24 Feb 2023"
            price={350000}
            onPress={() => router.push("/travel/travel-detail")}
          />
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 16,
          padding: 20,
          paddingTop: 10,
          paddingBottom: insets.bottom + 20,
        }}
      />
    </View>
  );
}

type TouchableIconWithIconProps = {
  icon: ReactNode;
  label: string;
} & TouchableNativeFeedbackProps;
function TouchableWithIcon({ icon, label }: TouchableIconWithIconProps) {
  const { Colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback>
      <View
        style={[
          style.touchableContainer,
          { borderColor: Colors.outlineborder },
        ]}
      >
        {icon}
        <Typography
          fontFamily="OpenSans-Light"
          fontSize={12}
          color="textsecondary"
        >
          {label}
        </Typography>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentHeaderContainer: {
    padding: 20,
    paddingBottom: 10,
    gap: 10,
  },
  headerTitleWrapper: {
    alignItems: "center",
    gap: 8,
    flexGrow: 0,
  },
  indicator: {
    marginHorizontal: 4,
    height: 4,
    width: 120,
    borderTopLeftRadius: 99,
    borderTopRightRadius: 99,
  },
  destinationOptionWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  touchableContainer: {
    padding: 10,
    gap: 18,
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: "row",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
});
