import { View, useColorScheme } from 'react-native';
import { Command } from './styles';
import { draculaTheme } from '../../colors';

export default function Commands({ item }) {
  const theme = useColorScheme();
 return (
   <View>
    <Command color={item.type === "command" ? theme === "dark" ? draculaTheme.foreground : draculaTheme.bg : '#f8f8f2'}>
        {item.output}
    </Command>
    </View>
  );
}