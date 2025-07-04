import { type GuessType } from "@/store/game-store";
import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export const Guess = ({
  guess,
  handleRemove,
}: {
  guess: GuessType;
  handleRemove: () => void;
}) => {
  return (
    <View
      style={{
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "black",
        backgroundColor: guess.isValid ? "green" : "red",
      }}
    >
      <Text
        style={{
          // color: guess.isValid ? "#000" : "#fff",
          color: "white",
        }}
      >
        {guess.name}
      </Text>
      <Pressable onPress={handleRemove}>
        <Entypo
          name="cross"
          size={24}
          // color={guess.isValid ? "red" : "white"}
          color="white"
        />
      </Pressable>
    </View>
  );
};
