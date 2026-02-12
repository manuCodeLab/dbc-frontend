import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ModernTemplate = ({ userData, isSelected }) => {
  const { name, title, email, phone, company, website } = userData;

  return (
    <View style={[styles.container, isSelected && styles.selected]}>
      <LinearGradient
        colors={['#667EEA', '#764BA2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Modern</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{name || 'John Doe'}</Text>
          <Text style={styles.title}>{title || 'Business Title'}</Text>

          <View style={styles.contactSection}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>📧</Text>
              <Text style={styles.contactValue}>{email || 'email@example.com'}</Text>
            </View>

            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>📱</Text>
              <Text style={styles.contactValue}>{phone || '+1 (555) 000-0000'}</Text>
            </View>

            {company && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>🏢</Text>
                <Text style={styles.contactValue}>{company}</Text>
              </View>
            )}

            {website && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>🌐</Text>
                <Text style={styles.contactValue}>{website}</Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 440,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  selected: {
    borderColor: '#667EEA',
    borderWidth: 3,
    shadowColor: '#667EEA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backdropFilter: 'blur(10px)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  contactSection: {
    marginTop: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 8,
  },
  contactLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  contactValue: {
    fontSize: 12,
    color: '#FFFFFF',
    flex: 1,
  },
});

export default ModernTemplate;
