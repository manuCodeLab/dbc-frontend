import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4E8D9',
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },

  leafPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    opacity: 0.2,
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 16,
  },

  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4E8D9',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#B8D4C8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },

  infoSection: {
    alignItems: 'center',
    marginVertical: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },

  title: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },

  contactSection: {
    alignItems: 'center',
    marginVertical: 8,
  },

  contactLabel: {
    fontSize: 10,
    color: '#333',
    marginVertical: 2,
  },

  qrSection: {
    alignItems: 'center',
    marginVertical: 8,
  },

  qrPlaceholder: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  qrText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
  },

  socialIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialText: {
    fontSize: 10,
    color: '#555',
    fontWeight: '600',
  },
});
