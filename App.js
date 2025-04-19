import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, FlatList, TextInput } from "react-native";
import { Container, Directory, Input } from "./styles";
import { useState } from "react";
import { draculaTheme } from "./src/colors";
import Commands from "./src/components/Commands";

const fileSystem = {
  type: "dir",
  name: "~",
  children: {
    src: {
      type: "dir",
      children: {},
    },
  },
};

export default function App() {
  const [commands, setCommands] = useState([
    {
      type: "message",
      output: "Seja bem-vindo ao Terbugs!",
    },
  ]);
  const [command, setCommand] = useState("");
  const [currentDir, setCurrentDir] = useState(["~"]);

  const handleCommand = () => {
    if (command === "ls") {
      ls();
    } else if (command === "clear" || command === "cls") clear();

    setCommand("");
  };

  const clear = () => setCommands([]);

  return (
    <Container>
      <StatusBar hidden />
      <ScrollView>
        <FlatList
          scrollEnabled={false}
          data={commands}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <Commands item={item} />}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Directory selectable>/{currentDir.join("/")} $</Directory>
          <Input
            value={command}
            onChangeText={setCommand}
            textAlignVertical="top"
            autoCapitalize="none"
            autoCorrect={false}
            selectionColor={draculaTheme.foreground}
            onSubmitEditing={handleCommand}
            autoFocus
          />
        </View>
      </ScrollView>
    </Container>
  );
}
