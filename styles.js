import Styled from "styled-components/native";
import { draculaTheme } from "./src/colors";

export const Container = Styled.View`
    flex: 1;
    background-color: ${draculaTheme.bg};
    padding: 10px;
    `;

export const Directory = Styled.Text`
color: ${draculaTheme.green};
font-size: 15px;
`;

export const Input = Styled.TextInput`
flex: 1;
    color: ${draculaTheme.foreground};
    font-size: 15px;
    padding: 5px;
    max-height: 150px;
`;
