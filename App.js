import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, ImageBackground } from "react-native";
import StartingScreen from "./screens/StartingScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <LinearGradient
      colors={["#12352a", "#215f4c", "#5f074c"]}
      style={styles.mainScreen}
    >
      <ImageBackground
        source={require("./assets/images/dice.png")}
        resizeMode="cover"
        style={styles.mainScreen}
        imageStyle={styles.backgroundImage}
      >
        <StartingScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.4,
  },
});
