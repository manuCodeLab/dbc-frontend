import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DarkTemplate = ({ userData, isSelected }) => {
  const { name, title, email, phone, company, website } = userData;

  return (
    <View style={[styles.container, isSelected && styles.selected]}>
      <View style={styles.header}>
        <View style={styles.accentBar} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Dark</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{name || 'John Doe'}</Text>
        {title && <Text style={styles.title}>{title}</Text>}

        <View style={styles.divider} />

        <View style={styles.infoSection}>
          {email && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{email}</Text>
            </View>
          )}

          {phone && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{phone}</Text>
            </View>
          )}

          {company && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Company</Text>
              <Text style={styles.infoValue}>{company}</Text>
            </View>
          )}

          {website && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>{website}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 440,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333333',
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  selected: {
    borderColor: '#FFD700',
    borderWidth: 3,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    backgroundColor: '#242424',
    padding: 16,
    paddingBottom: 20,
  },
  accentBar: {
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#1A1A1A',
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFD700',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 12,
  },
  infoSection: {
    gap: 10,
  },
  infoItem: {
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 12,
    color: '#E0E0E0',
    lineHeight: 16,
  },
  footer: {
    height: 6,
    backgroundColor: '#FFD700',
  },
});

export default DarkTemplate;
