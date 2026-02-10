import { StyleSheet } from 'react-native';
import COLORS from '../colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  scrollView: {
    flex: 1,
  },

  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  appTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginLeft: 12,
  },

  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },

  cardPreview: {
    width: '100%',
    height: 420,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  tipSection: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFF7E6',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },

  tipText: {
    fontSize: 13,
    color: '#333333',
    lineHeight: 18,
  },

  tipBold: {
    fontWeight: '700',
    color: COLORS.accent,
  },

  actionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },

  backLinkText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
    marginLeft: 6,
  },

  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7E6',
    borderWidth: 2,
    borderColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
    marginLeft: 8,
  },

  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A4A4A',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  downloadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },

  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 10,
  },

  shareButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
