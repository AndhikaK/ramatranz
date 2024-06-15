import { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";

import { Typography, View } from "@/components";
import { IconTruckDriver } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export type CarSeat10Props = {
  filled: string[];
  selected: string[];
  onSeatPress: (seatNumber: string) => void;
};
export function CarSeat10(props: CarSeat10Props) {
  const { filled = [], selected = [], onSeatPress = () => {} } = props;
  const { Colors } = useAppTheme();

  const getSeatStatus = (seatNumber: string): SeatItemProps["status"] => {
    if (filled.find((item) => item === seatNumber)) return "filled";

    if (selected.find((item) => item === seatNumber)) return "selected";

    return "available";
  };

  return (
    <View style={[styles.container, { borderColor: Colors.outlineborder }]}>
      <View style={styles.row1}>
        <SeatItem
          seatNumber="1"
          status={getSeatStatus("1")}
          onPress={() => onSeatPress("1")}
        />
        <SeatItem seatNumber="driver" status="driver" />
      </View>

      <View style={styles.backSeat}>
        <View style={styles.door}>
          <Typography fontFamily="Poppins-SemiBold">P</Typography>
          <Typography fontFamily="Poppins-SemiBold" style={{ marginTop: -10 }}>
            i
          </Typography>
          <Typography fontFamily="Poppins-SemiBold" style={{ marginTop: -10 }}>
            n
          </Typography>
          <Typography fontFamily="Poppins-SemiBold" style={{ marginTop: -10 }}>
            t
          </Typography>
          <Typography fontFamily="Poppins-SemiBold" style={{ marginTop: -10 }}>
            u
          </Typography>
        </View>
        <View style={{ alignItems: "flex-end", gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 2 }}>
            <SeatItem
              seatNumber="4"
              status={getSeatStatus("4")}
              onPress={() => onSeatPress("4")}
            />
            <SeatItem
              seatNumber="3"
              status={getSeatStatus("3")}
              onPress={() => onSeatPress("3")}
            />
            <SeatItem
              seatNumber="2"
              status={getSeatStatus("2")}
              onPress={() => onSeatPress("2")}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <SeatItem
              seatNumber="7"
              status={getSeatStatus("7")}
              onPress={() => onSeatPress("7")}
            />
            <View style={{ flexDirection: "row", gap: 2 }}>
              <SeatItem
                seatNumber="6"
                status={getSeatStatus("6")}
                onPress={() => onSeatPress("6")}
              />
              <SeatItem
                seatNumber="5"
                status={getSeatStatus("5")}
                onPress={() => onSeatPress("5")}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <SeatItem
              seatNumber="10"
              status={getSeatStatus("10")}
              onPress={() => onSeatPress("10")}
            />
            <View style={{ flexDirection: "row", gap: 2 }}>
              <SeatItem
                seatNumber="9"
                status={getSeatStatus("9")}
                onPress={() => onSeatPress("9")}
              />
              <SeatItem
                seatNumber="8"
                status={getSeatStatus("8")}
                onPress={() => onSeatPress("8")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

type SeatItemProps = {
  seatNumber: string;
  status: "filled" | "selected" | "available" | "driver";
} & TouchableWithoutFeedbackProps;
function SeatItem(props: SeatItemProps) {
  const { seatNumber, status, disabled, ...rest } = props;

  return (
    <TouchableWithoutFeedback disabled={status === "filled"} {...rest}>
      <View
        style={styles.seatItem}
        backgroundColor={
          status === "driver"
            ? "transparent"
            : status === "filled"
              ? "quarternary"
              : status === "available"
                ? "main"
                : "secondary"
        }
      >
        <Typography color="paper">
          {status === "driver" ? (
            <IconTruckDriver color="main" size={32} />
          ) : (
            seatNumber
          )}
        </Typography>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 10,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 24,
  },
  seatItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 2,
  },
  backSeat: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  door: {
    borderWidth: 1,
    borderRadius: 2,
    paddingBottom: 30,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    // transform: [{ rotate: "-90deg" }],
  },
});
