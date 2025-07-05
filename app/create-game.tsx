import { GameButton } from "@/components/game-button";
import { useGameStore } from "@/store/game-store";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateGame() {
  const [genre, setGenre] = useState("");
  const [rounds, setRounds] = useState(0);
  const [duration, setDuration] = useState(0);

  const initializeGame = useGameStore((state) => state.initializeGame);

  const isValid = useMemo(() => {
    return genre != "" && rounds > 0 && duration > 0 && duration < 300;
  }, [genre, rounds, duration]);

  const createGame = () => {
    initializeGame(duration, genre, rounds);
    router.replace("/game");
  };

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 10,
      }}
    >
      <Text>Create a new Game</Text>
      <View style={styles.inputContainer}>
        <Text>Genre</Text>
        <TextInput
          inputMode="text"
          onChangeText={setGenre}
          value={genre}
          placeholder="Genre of game"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Number of rounds</Text>
        <TextInput
          placeholder="Number of rounds"
          inputMode="numeric"
          keyboardType="number-pad"
          onChangeText={(value) => setRounds(+value)}
          value={rounds + ""}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Duration Between 1 and 300 (seconds)</Text>
        <TextInput
          placeholder="Between 1 and 300 (seconds)"
          inputMode="numeric"
          keyboardType="number-pad"
          onChangeText={(value) => setDuration(+value)}
          value={duration + ""}
          style={styles.input}
        />
      </View>

      <GameButton
        onPress={createGame}
        title="Create Game"
        disabled={!isValid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 2,
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderRadius: 4,
    color: "#000",
  },
});
