import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  previewContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 30,
  },
  saveButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.buttonText,
  },
  bottomSpacer: {
    height: 20,
  },
});

export default styles;
