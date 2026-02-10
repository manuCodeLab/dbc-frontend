import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8D5F2',
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },

  brushStroke1: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: '#F4D597',
    borderRadius: 50,
    top: -50,
    right: -50,
    opacity: 0.6,
  },

  brushStroke2: {
    position: 'absolute',
    width: 150,
    height: 150,
    backgroundColor: '#000',
    borderRadius: 30,
    bottom: 40,
    right: -30,
    opacity: 0.2,
  },

  brushStroke3: {
    position: 'absolute',
    width: 100,
    height: 200,
    backgroundColor: '#FFB84D',
    top: '50%',
    left: '-10%',
    opacity: 0.15,
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 16,
    zIndex: 10,
  },

  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFB84D',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8D5F2',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#D9C4E8',
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
    marginVertical: 16,
    zIndex: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2a2a2a',
  },

  title: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  divider: {
    height: 2,
    backgroundColor: '#FFB84D',
    marginHorizontal: 40,
    marginVertical: 8,
    zIndex: 10,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
    zIndex: 10,
  },

  socialDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFB84D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    fontSize: 18,
    color: '#fff',
  },
});
