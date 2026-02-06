import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },

  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  logoText: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: '600',
  },

  headerTitle: {
    color: '#0F0F0F',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    maxWidth: 140,
    textAlign: 'center',
  },

  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },

  profileText: {
    color: '#0F0F0F',
    fontSize: 18,
    fontWeight: '700',
  },

  // Title & Subtitle
  mainTitle: {
    color: '#0F0F0F',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  // Card styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitle: {
    color: '#0F0F0F',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },

  cardSubtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 20,
  },

  // Section title
  sectionTitle: {
    color: '#0F0F0F',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 16,
  },

  // Submit button
  submitButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  submitButtonText: {
    color: '#0F0F0F',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Button container
  buttonContainer: {
    marginTop: 24,
    marginBottom: 24,
  },

  // Empty state
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },

  emptyText: {
    color: '#999999',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default layoutStyles;
