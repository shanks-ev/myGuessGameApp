import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}> {children}</Text>
    </View>
  );
}

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.secondary500,
    padding: 24,
    margin: 24,
    alignItems: "center",
    borderRadius: 10,
  },
  number: {
    color: Colors.secondary500,
    fontSize: 36,
    fontFamily: "open-sans-bold",
  },
});
