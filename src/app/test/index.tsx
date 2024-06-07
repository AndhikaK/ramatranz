import { View } from "react-native";

import { Typography } from "@/components";

export default function TypographySample() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography fontFamily="OpenSans-Light">OpenSans Light</Typography>
      <Typography fontFamily="OpenSans-LightItalic">OpenSans Light</Typography>
      <Typography fontFamily="OpenSans-Regular">OpenSans Regular</Typography>
      <Typography fontFamily="OpenSans-RegularItalic">
        OpenSans Regular
      </Typography>
      <Typography fontFamily="OpenSans-Medium">OpenSans Medium</Typography>
      <Typography fontFamily="OpenSans-MediumItalic">
        OpenSans Medium
      </Typography>
      <Typography fontFamily="OpenSans-Bold">OpenSans Bold</Typography>
      <Typography fontFamily="OpenSans-BoldItalic">OpenSans Bold</Typography>

      <Typography fontFamily="Poppins-Light">Poppins Light</Typography>
      <Typography fontFamily="Poppins-LightItalic">Poppins Light</Typography>
      <Typography fontFamily="Poppins-Regular">Poppins Regular</Typography>
      <Typography fontFamily="Poppins-RegularItalic">
        Poppins Regular
      </Typography>
      <Typography fontFamily="Poppins-Medium">Poppins Medium</Typography>
      <Typography fontFamily="Poppins-MediumItalic">Poppins Medium</Typography>
      <Typography fontFamily="Poppins-Bold">Poppins Bold</Typography>
      <Typography fontFamily="Poppins-BoldItalic">Poppins Bold</Typography>
    </View>
  );
}
