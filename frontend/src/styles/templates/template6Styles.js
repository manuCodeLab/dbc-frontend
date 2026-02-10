import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1F3C',
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },

  networkBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },

  dot1: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00D9FF',
    top: '15%',
    right: '20%',
  },

  dot2: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00D9FF',
    top: '40%',
    left: '10%',
  },

  dot3: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00D9FF',
    bottom: '30%',
    right: '15%',
  },

  dot4: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00D9FF',
    top: '60%',
    left: '20%',
  },

  dot5: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#00D9FF',
    bottom: '20%',
    right: '35%',
  },

  line1: {
    position: 'absolute',
    width: 80,
    height: 1,
    backgroundColor: '#00D9FF',
    top: '25%',
    left: '30%',
  },

  line2: {
    position: 'absolute',
    width: 60,
    height: 1,
    backgroundColor: '#00D9FF',
    bottom: '35%',
    right: '20%',
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
    borderColor: '#00D9FF',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F1F3C',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1a3a52',
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
    zIndex: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },

  title: {
    fontSize: 12,
    color: '#00D9FF',
    marginTop: 4,
  },

  qrLarge: {
    alignItems: 'center',
    marginVertical: 12,
    zIndex: 10,
  },

  qrGrid: {
    width: 90,
    height: 90,
    borderWidth: 2,
    borderColor: '#00D9FF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
  },

  qrGridText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00D9FF',
    letterSpacing: 2,
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
    zIndex: 10,
  },

  socialCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 217, 255, 0.15)',
    borderWidth: 1,
    borderColor: '#00D9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialIcon: {
    fontSize: 16,
  },
});
