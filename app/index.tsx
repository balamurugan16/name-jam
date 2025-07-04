import { useGameStore } from "@/store/game-store";
import { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { RandomLetter } from "@/components/random-letter";

export default function Index() {
  const [name, setName] = useState<string>("");
  const { addName, names, removeName } = useGameStore((state) => state);

  function handleSubmit() {
    if (name.trim().length === 0) return;
    addName(name.trim());
    setName("");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, margin: 10, padding: 10 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
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
      <ScrollView>
        <FlatList
          contentContainerStyle={{
            padding: 20,
            gap: 10,
            flexGrow: 1,
          }}
          data={names}
          renderItem={({ item, index }) => (
            <View
              style={{
                padding: 8,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item}</Text>
              <Pressable onPress={() => removeName(index)}>
                <Entypo name="cross" size={24} color="red" />
              </Pressable>
            </View>
          )}
        />
      </ScrollView>
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
