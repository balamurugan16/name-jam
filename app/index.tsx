import { useGameStore } from "@/store/game-store";
import { useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GlitchLetter } from "@/components/glitch-letter";
import { Guess } from "@/components/guess";
import { Timer } from "@/components/timer";

export default function Index() {
  const [name, setName] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const { addGuess, guesses, removeGuess, letter, initializeGame, duration } =
    useGameStore((state) => state);

  function handleSubmit() {
    if (name.trim().length === 0) return;
    addGuess(name.trim());
    setName("");
  }

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, margin: 10, padding: 10, gap: 10 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <GlitchLetter target={letter} />
        <Timer
          duration={duration}
          onComplete={() => {
            setTimeUp(true);
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.nameInput}
          placeholder="Start typing..."
          keyboardType="default"
          autoComplete="off"
          value={name}
          editable={!timeUp}
          onChangeText={setName}
          returnKeyType="done"
          returnKeyLabel="Done"
          onSubmitEditing={handleSubmit}
          submitBehavior="submit"
        />
      </View>
      <FlatList
        contentContainerStyle={{
          padding: 20,
          gap: 10,
          flexGrow: 1,
        }}
        data={guesses}
        renderItem={({ item, index }) => (
          <Guess guess={item} handleRemove={() => removeGuess(index)} />
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  nameInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: 300,
    padding: 10,
    borderRadius: 4,
    color: "#000",
  },
});
