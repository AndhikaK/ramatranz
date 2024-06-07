import { Text, TextProps } from "react-native";

export type TypographyProps = {
    fontFamily?: string
} & TextProps
export function Typography(props: TypographyProps) {
    const {children, fontFamily = 'Poppins-Bold' } = props
    
    return <Text style={[{ fontFamily, color: 'black' }]}>{children}</Text>;
}