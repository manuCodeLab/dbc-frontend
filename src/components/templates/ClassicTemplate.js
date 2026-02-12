import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ClassicTemplate = ({ userData, isSelected }) => {
  const { name, title, email, phone, company, website } = userData;

  return (
    <View style={[styles.container, isSelected && styles.selected]}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Classic</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name || 'John Doe'}</Text>
        <Text style={styles.title}>{title || 'Business Title'}</Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Company</Text>
          <Text style={styles.value}>{company || 'Your Company'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email || 'email@example.com'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{phone || '+1 (555) 000-0000'}</Text>
        </View>

        {website && (
          <View style={styles.section}>
            <Text style={styles.label}>Website</Text>
            <Text style={styles.value}>{website}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  selected: {
    borderColor: '#2E7D32',
    borderWidth: 3,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    backgroundColor: '#1565C0',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1565C0',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#757575',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: '#424242',
    lineHeight: 16,
  },
  footer: {
    height: 8,
    backgroundColor: '#1565C0',
  },
});

export default ClassicTemplate;
