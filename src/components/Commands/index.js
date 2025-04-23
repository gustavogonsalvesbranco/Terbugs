import { View, useColorScheme } from 'react-native';
import { Command } from './styles';
import { draculaTheme } from '../../utils/colors';

export default function Commands({ item }) {
  const theme = useColorScheme();
 return (
   <View>
    <Command color={item.type === "dir" ? draculaTheme.green : item.type === "file" ? draculaTheme.pink : item.type === "error" ? draculaTheme.red : draculaTheme.foreground }>
        {item.output}
    </Command>
    </View>
  );
}