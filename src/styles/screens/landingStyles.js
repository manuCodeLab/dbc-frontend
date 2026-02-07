import { StyleSheet } from 'react-native';

export const landingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // ========== HEADER SECTION ==========
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderBottomColor: '#D4AF37',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  logoBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },

  headerTitle: {
    color: '#0F0F0F',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 3,
  },

  // ========== HERO SECTION ==========
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  heroIconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#D4AF37',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  heroTitle: {
    color: '#0F0F0F',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },

  heroSubtitle: {
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 24,
  },

  // ========== FEATURES SECTION ==========
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  featuresTitle: {
    color: '#0F0F0F',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },

  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  featureIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },

  featureContent: {
    flex: 1,
  },

  featureCardTitle: {
    color: '#0F0F0F',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },

  featureCardText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },

  // ========== CTA SECTION ==========
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },

  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0F0F0F',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
    gap: 10,
  },

  primaryButtonText: {
    color: '#0F0F0F',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37',
    gap: 10,
  },

  secondaryButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ========== INFO SECTION ==========
  infoSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-around',
  },

  infoCard: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  infoNumber: {
    color: '#D4AF37',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },

  infoLabel: {
    color: '#0F0F0F',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ========== FOOTER SECTION ==========
  footerSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },

  footerText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default landingStyles;
