import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: 'white',
    fontSize: 18,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: 'white',
    fontWeight: 'bold',
  },

  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6c5ce7',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  cardSubtitle: {
    color: '#777',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
