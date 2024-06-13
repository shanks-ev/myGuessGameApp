import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import Colors from "../constants/colors";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let lowBound = 1;
let upBound = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(0, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState([initialGuess]);

  useEffect(() => {
    lowBound = 1;
    upBound = 100;
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(rounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(higherOrLower) {
    // '+' , '-'

    if (
      (higherOrLower === "-" && currentGuess < userNumber) ||
      (higherOrLower === "+" && currentGuess > userNumber)
    ) {
      Alert.alert("Lying poes!", "WANKER ALERT", [
        { text: "Soz", style: "cancel" },
      ]);
      return;
    }

    if (higherOrLower === "-") {
      upBound = currentGuess;
    } else {
      lowBound = currentGuess + 1;
    }

    const newRndNum = generateRandomBetween(lowBound, upBound, currentGuess);
    setCurrentGuess(newRndNum);
    setRounds((prevGuessRounds) => [...prevGuessRounds, newRndNum]);
  }

  const guessRoundsListLength = rounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer> {currentGuess} </NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.highLowButtons}>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "-")}>
              <Ionicons name="remove-circle" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "+")}>
              <Ionicons name="add-circle" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {rounds.map((round) => (
          <Text key={round}>{round}</Text>
        ))} */}
        <FlatList
          data={rounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.secondary500,
    textAlign: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.secondary500,
  },
  highLowButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  userNum: {
    fontWeight: "bold",
  },
  instructionText: {
    marginBottom: 10,
  },

  buttonsContainer: {
    flex: 1,
  },

  listContainer: {
    flex: 1,
    padding: 16,
  },
});
