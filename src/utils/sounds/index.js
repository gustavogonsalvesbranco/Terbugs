import { Audio } from "expo-av";

export const playSound = async (url) => {
  try {
    const { sound } = await Audio.Sound.createAsync(url, {
      shouldPlay: true,
    });
  } catch (error) {
    alert("Error playing sound: " + error.message);
  }
};
