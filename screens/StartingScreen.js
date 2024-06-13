import {
  TextInput,
  Text,
  View,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartingScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(userInput) {
    setEnteredNumber(userInput);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function enterInputHandler() {
    const chosenNum = parseInt(enteredNumber);

    if (isNaN(chosenNum) || chosenNum < 1 || chosenNum > 99) {
      Alert.alert(
        "Invalid number (" + enteredNumber + ")",
        "Number must be inbetween 0 and 100",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );

      return;
    }
    onPickNumber(chosenNum);
  }
  return (
    <View style={styles.rootContainer}>
      <Title>Guessing Game</Title>

      <Card>
        <InstructionText>Enter a number</InstructionText>
        <TextInput
          style={styles.userInput}
          maxLength={2}
          keyboardType="number-pad"
          returnKeyType="done"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={enterInputHandler}>Enter</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 60,
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
  },
  buttonsContainer: {
    flex: 1,
  },
  userInput: {
    height: 50,
    width: 70,
    fontSize: 32,
    color: Colors.secondary500,
    borderBottomColor: Colors.secondary500,
    borderBottomWidth: 2,
    marginVertical: 8,
    fontFamily: "cursive",
    fontWeight: "bold",
    textAlign: "center",
  },
});
