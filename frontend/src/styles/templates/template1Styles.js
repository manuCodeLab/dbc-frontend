import { StyleSheet } from "react-native";
import COLORS from "../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0F0F0F',
    position: 'relative',
    overflow: 'hidden',
  },
  bgPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
    opacity: 0.6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logoBox: {
    marginBottom: 12,
  },
  logoText: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    color: COLORS.accent,
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 1,
  },
  tagline: {
    color: "#999",
    fontSize: 9,
    letterSpacing: 0.5,
    marginTop: 4,
  },
});
