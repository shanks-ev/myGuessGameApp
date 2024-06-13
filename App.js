import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, ImageBackground, SafeAreaView } from "react-native";
import StartingScreen from "./screens/StartingScreen";
import { useState } from "react";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOver from "./screens/GameOver";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);

  useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Regular.ttf"),
    test: require("./assets/fonts/KOMIKAX_.ttf"),
  });

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameOver(true);
    setNumberOfGuesses(numberOfRounds);
  }
  function startNewGameHandler() {
    setUserNumber(null);
    setNumberOfGuesses(0);
  }

  let screen = <StartingScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOver
        userNumber={userNumber}
        numRounds={numberOfGuesses}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary600, Colors.primary500, Colors.secondary500]}
      style={styles.mainScreen}
    >
      <ImageBackground
        source={require("./assets/images/dice.png")}
        resizeMode="cover"
        style={styles.mainScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.mainScreen}>{screen}</SafeAreaView>
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
