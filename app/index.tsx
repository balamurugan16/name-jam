import { GameButton } from "@/components/game-button";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <GameButton
        title="Create a Game"
        onPress={() => router.navigate("/create-game")}
      />
    </View>
  );
}
