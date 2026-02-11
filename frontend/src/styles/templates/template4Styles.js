import { StyleSheet } from "react-native";
import COLORS from "../colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a3a',
    flexDirection: 'row',
  },
  leftSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.accent,
  },
  nameLeft: {
    color: '#fff',
    fontWeight: "bold",
    fontSize: 10,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  rightSection: {
    flex: 0.6,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  contactSection: {
    marginBottom: 6,
  },
  locationSection: {
    marginTop: 4,
  },
  sectionTitle: {
    color: COLORS.accent,
    fontSize: 7,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  contactItem: {
    color: "#ccc",
    fontSize: 7,
    marginVertical: 1,
  },
  locationItem: {
    color: "#ccc",
    fontSize: 7,
    marginBottom: 2,
  },
  skillTag: {
    color: COLORS.accent,
    fontSize: 6,
    borderWidth: 1,
    borderColor: COLORS.accent,
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
});