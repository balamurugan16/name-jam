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
import { Guess } from "@/components/Guess";

export default function Index() {
  const [name, setName] = useState<string>("");
  const { addGuess, guesses, removeGuess, letter, generateLetter } =
    useGameStore((state) => state);

  function handleSubmit() {
    if (name.trim().length === 0) return;
    addGuess(name.trim());
    setName("");
  }

  useEffect(() => {
    generateLetter();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, margin: 10, padding: 10, gap: 4 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <GlitchLetter target={letter} />
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.nameInput}
          placeholder="Start typing..."
          keyboardType="default"
          autoComplete="off"
          value={name}
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
