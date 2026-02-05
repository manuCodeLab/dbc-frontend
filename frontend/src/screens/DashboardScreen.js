import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/colors";

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
  const [userName] = useState("Nandu Kumar");
  const [cardShares] = useState(245);
  const [views] = useState(1250);

  const handleCardAction = (action) => {
    Alert.alert(`${action}`, `Feature coming soon!`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* PREMIUM HEADER */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>NK</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.greeting}>Welcome Back!</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <TouchableOpacity style={styles.settingsBtn}>
              <Ionicons name="settings-outline" size={24} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
        </View>

        {/* STATS SECTION */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIconWrapper}>
              <Ionicons name="eye" size={20} color={COLORS.accent} />
            </View>
            <Text style={styles.statValue}>{views}</Text>
            <Text style={styles.statLabel}>Profile Views</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconWrapper}>
              <Ionicons name="share-social" size={20} color={COLORS.accent} />
            </View>
            <Text style={styles.statValue}>{cardShares}</Text>
            <Text style={styles.statLabel}>Card Shares</Text>
          </View>
        </View>

        {/* MY DIGITAL CARD PREVIEW */}
        <TouchableOpacity style={styles.cardPreview}>
          <View style={styles.cardHeader}>
            <Ionicons name="card" size={32} color={COLORS.accent} />
            <Text style={styles.cardPreviewTitle}>My Digital Card</Text>
          </View>
          <View style={styles.cardDivider} />
          <Text style={styles.cardPreviewSubtitle}>{userName}</Text>
          <Text style={styles.cardPreviewRole}>Digital Entrepreneur</Text>
          <View style={styles.cardFooter}>
            <Ionicons name="arrow-forward" size={20} color={COLORS.accent} />
            <Text style={styles.viewCardText}>View Full Card</Text>
          </View>
        </TouchableOpacity>

        {/* QUICK ACTIONS GRID */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          <ActionCard 
            title="Edit Profile" 
            icon="person-outline" 
            color={COLORS.accent}
            onPress={() => handleCardAction('Edit Profile')}
          />
          <ActionCard 
            title="Share Card" 
            icon="share-social" 
            color={COLORS.accent}
            onPress={() => handleCardAction('Share Card')}
          />
          <ActionCard 
            title="Analytics" 
            icon="bar-chart-outline" 
            color={COLORS.accent}
            onPress={() => handleCardAction('Analytics')}
          />
          <ActionCard 
            title="Contacts" 
            icon="people-outline" 
            color={COLORS.accent}
            onPress={() => handleCardAction('Contacts')}
          />
          <ActionCard 
            title="Templates" 
            icon="layers-outline" 
            color={COLORS.accent}
            onPress={() => handleCardAction('Templates')}
          />
          <ActionCard 
            title="Settings" 
            icon="settings-outline" 
            color={COLORS.accent}
            onPress={() => handleCardAction('Settings')}
          />
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.primary} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const ActionCard = ({ title, icon, color, onPress }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <Text style={styles.actionCardText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },

  // HEADER
  header: {
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.accent,
  },
  profileInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 2,
  },
  settingsBtn: {
    padding: 10,
  },

  // STATS
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },

  // CARD PREVIEW
  cardPreview: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardPreviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.accent + '30',
    marginBottom: 12,
  },
  cardPreviewSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: 4,
  },
  cardPreviewRole: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCardText: {
    color: COLORS.accent,
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 13,
  },

  // SECTION TITLE
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },

  // GRID
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  actionCard: {
    width: (width - 40) / 2,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent + '30',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },

  // LOGOUT
  logoutBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 10,
    marginTop: 8,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
