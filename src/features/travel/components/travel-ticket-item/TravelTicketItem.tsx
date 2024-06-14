import {
  StyleSheet,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedback,
} from "react-native";

import { Separator, Typography, View } from "@/components";
import { IconCarSide } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { formatCurrency } from "@/utils/common";
import { formatDate, formatTime } from "@/utils/datetime";

export type TravelTicketItemProps = {
  carModel: string;
  carSeat: number;
  price: number;
  availableSeat: number;
  originCity: string;
  originDepartureDate: Date;
  destinationCity: string;
  destinationDepartureDate: Date;
  departureDate: Date;
} & TouchableNativeFeedbackProps;
export function TravelTicketItem(props: TravelTicketItemProps) {
  const {
    availableSeat,
    carModel,
    carSeat,
    departureDate,
    destinationCity,
    destinationDepartureDate,
    originCity,
    originDepartureDate,
    price,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback {...rest}>
      <View style={[style.container, { borderColor: Colors.outlineborder }]}>
        <View style={style.headerContainer}>
          <View style={style.leftHeaderWrapper}>
            <Typography color="main">{carModel}</Typography>
            <View backgroundColor="main" style={style.point} />
            <Typography color="main">{carSeat}</Typography>
          </View>

          <View style={style.rightHeaderWrapper}>
            <Typography
              color="main"
              fontFamily="OpenSans-Semibold"
              fontSize={16}
            >
              {formatCurrency(price)}
            </Typography>
            <Typography
              color={
                availableSeat <= 0 || availableSeat < carSeat / 2
                  ? "dangerbase"
                  : "success"
              }
              fontFamily="OpenSans-Regular"
              fontSize={14}
            >
              {availableSeat <= 0
                ? "Tidak tersedia"
                : availableSeat > carSeat / 2
                  ? "Tersedia"
                  : `${availableSeat} kursi lagi`}
            </Typography>
          </View>
        </View>

        <View>
          <Separator />
        </View>

        <View style={style.headerContainer}>
          <View style={style.contentLeftWrapper}>
            <Typography color="textsecondary" fontSize={14} numberOfLines={1}>
              {originCity}
            </Typography>
            <Typography color="textsecondary" fontSize={12}>
              {formatDate(originDepartureDate, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </View>

          <View style={style.contentSeparatorIndicator}>
            <Separator style={{ position: "absolute" }} />
            <View
              backgroundColor="paper"
              style={[style.separatorPoint, { borderColor: Colors.main }]}
            />
            <IconCarSide color="main" />
            <View backgroundColor="main" style={style.separatorPoint} />
          </View>

          <View style={style.contentRightWrapper}>
            <Typography color="textsecondary" fontSize={14} numberOfLines={1}>
              {destinationCity}
            </Typography>
            <Typography color="textsecondary" fontSize={12}>
              {formatDate(destinationDepartureDate, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </View>
        </View>

        <View style={style.center}>
          <Typography fontFamily="OpenSans-Regular" fontSize={12}>
            {formatTime(departureDate)}
          </Typography>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 12,
    gap: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
  },
  leftHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightHeaderWrapper: {
    alignItems: "flex-end",
    gap: 4,
  },
  point: {
    height: 4,
    width: 4,
    borderRadius: 99,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  center: {
    alignItems: "center",
  },
  contentSeparatorIndicator: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separatorPoint: {
    height: 6,
    width: 6,
    borderWidth: 1.5,
    borderRadius: 99,
  },
  separatorDonuts: {
    height: 6,
    width: 6,
    borderRadius: 99,
  },
  contentLeftWrapper: {
    flex: 1,
    gap: 5,
  },
  contentRightWrapper: {
    flex: 1,
    alignItems: "flex-end",
    gap: 4,
  },
});
