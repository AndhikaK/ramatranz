import { ActivityIndicator } from "react-native";

import { useAppTheme } from "@/context/theme-context";

export function Loader() {
  const { Colors } = useAppTheme();

  return <ActivityIndicator color={Colors.main} size={44} />;
}
