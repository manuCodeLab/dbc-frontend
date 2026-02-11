import { StyleSheet } from 'react-native';
import { COLORS } from '../colors';

export const businessStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 12,
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
  },
  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});
