import { TextInput, View, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

function StartingScreen() {
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
    console.log("Valid number");
  }
  return (
    <View style={styles.inputContainer}>
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
        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        <PrimaryButton onPress={enterInputHandler}>Enter</PrimaryButton>
      </View>
    </View>
  );
}

export default StartingScreen;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    marginTop: 100,
    marginHorizontal: 24,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#12352a",
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  userInput: {
    height: 50,
    width: 70,
    fontSize: 32,
    color: "#5f074c",
    borderBottomColor: "#5f074c",
    borderBottomWidth: 2,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});
