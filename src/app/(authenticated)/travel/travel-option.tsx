import { ReactNode, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TravelScheduleResponseSuccess } from "@/apis/internal.api.type";
import { Appbar, Loader, Snackbar, Typography, View } from "@/components";
import {
  IconDoorThin,
  IconIcArrowRight,
  IconPinSharp,
} from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetTravelSchedule } from "@/features/travel/api/useGetSchedule";
import { TravelTicketItem } from "@/features/travel/components";
import {
  useTravelActions,
  useTravelbookingPayload,
  useTravelDoorToDoorPayload,
} from "@/features/travel/store/travel-store";
import { formatDate } from "@/utils/datetime";

export default function TravelOptionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const travelBookingPayload = useTravelbookingPayload();
  const doorToDoorPayload = useTravelDoorToDoorPayload();
  const { setDoorToDoorPayload, setTravelSchedule } = useTravelActions();

  const travelScheduleQuery = useGetTravelSchedule({
    from: travelBookingPayload?.from || "",
    to: travelBookingPayload?.to || "",
    date: travelBookingPayload?.date as Date,
  });

  const handleSelectSchedule = (
    travelSchedule: TravelScheduleResponseSuccess["data"][number]
  ) => {
    if (travelSchedule.carSeat - travelSchedule.seatTaken.length <= 0) {
      Snackbar.show({
        message: "Kursi sudah habis",
      });
      return;
    }

    if (!doorToDoorPayload?.from || !doorToDoorPayload.to) {
      Snackbar.show({
        message:
          "Pilih alamat pada Door to Door/Point to Point terlebih dahulu",
      });
      return;
    }

    setTravelSchedule(travelSchedule);
    router.push("/travel/travel-detail");
  };

  // reset doorToDoorPayload to make sure it fresh data
  useEffect(() => {
    setDoorToDoorPayload({
      from: undefined,
      to: undefined,
    });
  }, [setDoorToDoorPayload]);

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar
        title={
          <View style={style.headerWrapper}>
            <Typography
              fontFamily="Poppins-Bold"
              fontSize={16}
              style={{ flex: 1, textAlign: "right" }}
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
            disabled={
              !travelScheduleQuery.data ||
              travelScheduleQuery.data?.data.length <= 0
            }
            onPress={() =>
              router.push({
                pathname: "/travel/form-door-to-door/[pageType]",
                params: {
                  pageType: "from",
                },
              })
            }
          />
          <TouchableWithIcon
            icon={<IconPinSharp width={20} height={20} color="main" />}
            label="Point to Point"
            // disable point to point, since it need TBD
            disabled={
              !travelScheduleQuery.data ||
              travelScheduleQuery.data?.data.length <= 0 ||
              true
            }
          />
        </View>
      </View>

      <FlatList
        data={travelScheduleQuery.data?.data || []}
        renderItem={({ item }) => (
          <TravelTicketItem
            carModel={item.carModel}
            carSeat={item.carSeat}
            availableSeat={item.carSeat - item.seatTaken.length}
            departureDate={new Date(item.departureDate)}
            destinationCity={item.originCity}
            destinationDepartureDate={new Date(item.destinationDepartureDate)}
            originCity={item.destinationCity}
            originDepartureDate={new Date(item.originDepartureDate)}
            price={item.price}
            onPress={() => handleSelectSchedule(item)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={style.emptyScheduleContainer}>
            {travelScheduleQuery.isFetching ? (
              <Loader />
            ) : (
              <Typography fontFamily="Poppins-Medium">
                Tidak ada jadwal
              </Typography>
            )}
          </View>
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
function TouchableWithIcon({
  icon,
  label,
  disabled,
  ...rest
}: TouchableIconWithIconProps) {
  const { Colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback disabled={disabled} {...rest}>
      <View
        backgroundColor={disabled ? "outlineborder" : "paper"}
        style={[
          style.touchableContainer,
          { borderColor: Colors.outlineborder },
        ]}
      >
        {icon}
        <Typography
          fontFamily="OpenSans-Light"
          fontSize={12}
          color="textprimary"
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
  emptyScheduleContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
