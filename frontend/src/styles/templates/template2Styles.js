import { StyleSheet } from "react-native";
import COLORS from "../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1a3a2a',
    position: 'relative',
    overflow: 'hidden',
  },
  bgCurve1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.accent,
    top: -30,
    left: -30,
  },
  bgCurve2: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.accent,
    bottom: -20,
    right: -20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconCircle: {
    marginBottom: 16,
  },
  iconText: {
    color: COLORS.accent,
    fontSize: 28,
    fontWeight: 'bold',
  },
  name: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  tagline: {
    color: "#aaa",
    fontSize: 9,
    marginTop: 4,
  },
});