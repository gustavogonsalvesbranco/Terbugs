import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, FlatList, TextInput } from "react-native";
import { Container, Directory, Input } from "./styles";
import { useRef, useState } from "react";
import { draculaTheme } from "./src/utils/colors";
import Commands from "./src/components/Commands";
import { fileSystem } from "./src/utils/fileSystem";
import { playSound } from "./src/utils/sounds";

export default function App() {
  const [commands, setCommands] = useState([
    {
      type: "message",
      output: "Seja bem-vindo ao Terbugs!",
    },
  ]);
  const [command, setCommand] = useState("");
  const [currentDir, setCurrentDir] = useState([fileSystem.name]);
  const listRef = useRef(null);

  const handleCommand = () => {
    const [cmd, ...args] = command.trim().split(" ");

    setCommands((prev) => [
      ...prev,
      { type: "command", output: `> ${command}` },
    ]);

    if (cmd === "ls") {
      ls();
    } else if (cmd === "clear" || command === "cls") {
      clear();
    } else if (cmd === "cd") {
      cd(args[0]);
    } else {
      error(command, `Terbugs: Acho que o comando "${command}" tá bugado!`);
    }

    setCommand("");
    listRef.current.scrollToEnd({ animated: true });
  };

  const ls = () => {
    let dir = fileSystem;
    currentDir.slice(1).forEach((folder) => {
      dir = dir.children?.[folder];
    });

    const children = dir?.children || {};
    const output = Object.entries(children).map(([name, data]) => ({
      type: data.type,
      output: name,
    }));

    setCommands((prev) => [...prev, ...output]);
    playSound(require("./assets/sounds/success.mp3"));
  };

  const clear = () => {
    setCommands([]);
    playSound(require("./assets/sounds/success.mp3"));
  };

  const cd = (folder) => {
    if (!folder) {
      error(
        "cd",
        "Terbugs: Teu sérebro tá bugado? Deve digitar cd <nome-da-pasta> ou cd .. para voltar pra pasta anterior."
      );
      return;
    }

    if (folder === "..") {
      if (currentDir.length > 1) {
        setCurrentDir((prev) => prev.slice(0, -1));
        playSound(require("./assets/sounds/success.mp3"));
      } else {
        error("cd", "Terbugs: Não dá pra voltar mais que isso!");
      }
      return;
    }

    let dir = fileSystem;

    for (let i = 1; i < currentDir.length; i++) {
      dir = dir?.children?.[currentDir?.[i]];
    }

    const nextDir = dir?.children?.[folder];

    if (nextDir && nextDir?.type === "dir") {
      setCurrentDir((prev) => [...prev, folder]);
    } else {
      error("cd", `Terbugs: Não consegui achar a pasta "${folder}"`);
      return;
    }
  };

  const error = (command, message) => {
    setCommands((prev) => [...prev, { type: "error", output: message }]);
    listRef.current.scrollToEnd({ animated: true });
    playSound(require("./assets/sounds/error.mp3"));
  };

  return (
    <Container>
      <StatusBar style="light" translucent={false} />
      <FlatList
        style={{ flexGrow: 0 }}
        data={commands}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Commands item={item} />}
        ref={listRef}
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
          blurOnSubmit={false}
          autoFocus
        />
      </View>
    </Container>
  );
}
