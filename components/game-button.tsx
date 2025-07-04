import { StyleSheet, Text, Pressable, Platform } from "react-native";
import * as Haptics from "expo-haptics";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function GameButton({ title, onPress, disabled = false }: Props) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => {
        if (pressed) return [styles.button, styles.buttonPressed];
        if (disabled) return [styles.button, styles.buttonDisabled];
        return styles.button;
      }}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: "#29b365",
  },
  buttonPressed: {
    backgroundColor: "#206a42",
  },
  buttonDisabled: {
    backgroundColor: "grey",
  },
});
