import {
  StyleSheet,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedback,
} from "react-native";

import { Separator, Typography, View } from "@/components";
import { IconCarSide } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export type TravelTicketItemProps = {
  carModel: string;
  carSeat: number;
  price: number;
  availableSeat: number;
  originCity: string;
  originDepartureDate: string;
  destinationCity: string;
  destinationDepartureDate: string;
  departureDate: string;
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
              {price}
            </Typography>
            <Typography
              color="main"
              fontFamily="OpenSans-Regular"
              fontSize={14}
            >
              {availableSeat}
            </Typography>
          </View>
        </View>

        <View>
          <Separator />
        </View>

        <View style={style.headerContainer}>
          <View>
            <Typography color="textsecondary" fontSize={14}>
              {originCity}
            </Typography>
            <Typography color="textsecondary" fontSize={12}>
              {originDepartureDate}
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

          <View style={style.rightHeaderWrapper}>
            <Typography color="textsecondary" fontSize={14}>
              {destinationCity}
            </Typography>
            <Typography color="textsecondary" fontSize={12}>
              {destinationDepartureDate}
            </Typography>
          </View>
        </View>

        <View style={style.center}>
          <Typography fontFamily="OpenSans-Regular" fontSize={12}>
            08.00
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
    gap: 5,
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
});
