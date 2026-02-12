import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MinimalTemplate = ({ userData, isSelected }) => {
  const { name, title, email, phone, company, website } = userData;

  return (
    <View style={[styles.container, isSelected && styles.selected]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Minimal</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.spacer} />

        <View>
          <Text style={styles.name}>{name || 'John Doe'}</Text>
          {title && <Text style={styles.title}>{title}</Text>}
        </View>

        <View style={styles.spacer} />

        <View style={styles.contactContainer}>
          {email && <Text style={styles.contact}>{email}</Text>}
          {phone && <Text style={styles.contact}>{phone}</Text>}
          {company && <Text style={styles.contact}>{company}</Text>}
          {website && <Text style={styles.contact}>{website}</Text>}
        </View>

        <View style={styles.spacer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 440,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    marginHorizontal: 8,
    padding: 24,
    justifyContent: 'space-between',
  },
  selected: {
    borderColor: '#333333',
    borderWidth: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  spacer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '300',
    color: '#1F1F1F',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '400',
    color: '#999999',
    letterSpacing: 0.3,
  },
  contactContainer: {
    gap: 8,
  },
  contact: {
    fontSize: 11,
    color: '#777777',
    lineHeight: 16,
    letterSpacing: 0.2,
  },
});

export default MinimalTemplate;
