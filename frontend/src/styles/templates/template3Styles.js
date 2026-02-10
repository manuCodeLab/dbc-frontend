import { StyleSheet } from "react-native";
import COLORS from "../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a4a',
    padding: 12,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontWeight: "bold",
    fontSize: 11,
    letterSpacing: 0.5,
  },
  role: {
    color: "#aaa",
    fontSize: 8,
    marginTop: 2,
  },
  divider: {
    width: 20,
    height: 1,
    backgroundColor: COLORS.accent,
    marginVertical: 4,
  },
  handle: {
    color: COLORS.accent,
    fontSize: 8,
    marginTop: 4,
  },
  subtitle: {
    color: "#999",
    fontSize: 8,
    marginTop: 2,
  },
  contactBox: {
    marginTop: 6,
  },
  contactItem: {
    color: "#ccc",
    fontSize: 7,
    marginVertical: 1,
  },
});