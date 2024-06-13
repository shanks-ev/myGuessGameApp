import { Text, StyleSheet, Platform } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "test",
    fontSize: Platform.select({
      android: 26,
      ios: 34,
    }),
    color: "white",
    textAlign: "center",
    marginTop: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
  },
});
