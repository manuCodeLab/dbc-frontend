import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';
import { dashboardStyles } from '../../styles/dashboardStyles';

export default function DashboardScreen({ navigation }) {
  const [userName] = useState('Nandu Kumar');
  const [cardShares] = useState(245);
  const [views] = useState(1250);

  const handleCardAction = (action) => {
    Alert.alert(`${action}`, 'Feature coming soon!');
  };

  return (
    <SafeAreaView style={dashboardStyles.safe}>
      <ScrollView
        contentContainerStyle={dashboardStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* PREMIUM HEADER */}
        <View style={dashboardStyles.header}>
          <View style={dashboardStyles.profileSection}>
            <View style={dashboardStyles.avatarContainer}>
              <Text style={dashboardStyles.avatarText}>NK</Text>
            </View>
            <View style={dashboardStyles.profileInfo}>
              <Text style={dashboardStyles.greeting}>Welcome Back!</Text>
              <Text style={dashboardStyles.userName}>{userName}</Text>
            </View>
            <TouchableOpacity style={dashboardStyles.settingsBtn}>
              <Ionicons name="settings-outline" size={24} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
        </View>

        {/* STATS SECTION */}
        <View style={dashboardStyles.statsContainer}>
          <View style={dashboardStyles.statCard}>
            <View style={dashboardStyles.statIconWrapper}>
              <Ionicons name="eye" size={20} color={COLORS.accent} />
            </View>
            <Text style={dashboardStyles.statValue}>{views}</Text>
            <Text style={dashboardStyles.statLabel}>Profile Views</Text>
          </View>
          <View style={dashboardStyles.statCard}>
            <View style={dashboardStyles.statIconWrapper}>
              <Ionicons name="share-social" size={20} color={COLORS.accent} />
            </View>
            <Text style={dashboardStyles.statValue}>{cardShares}</Text>
            <Text style={dashboardStyles.statLabel}>Card Shares</Text>
          </View>
        </View>

        {/* MY DIGITAL CARD PREVIEW */}
        <TouchableOpacity style={dashboardStyles.cardPreview}>
          <View style={dashboardStyles.cardHeader}>
            <Ionicons name="card" size={32} color={COLORS.accent} />
            <Text style={dashboardStyles.cardPreviewTitle}>My Digital Card</Text>
          </View>
          <View style={dashboardStyles.cardDivider} />
          <Text style={dashboardStyles.cardPreviewSubtitle}>{userName}</Text>
          <Text style={dashboardStyles.cardPreviewRole}>Digital Entrepreneur</Text>
          <View style={dashboardStyles.cardFooter}>
            <Ionicons name="arrow-forward" size={20} color={COLORS.accent} />
            <Text style={dashboardStyles.viewCardText}>View Full Card</Text>
          </View>
        </TouchableOpacity>

        {/* QUICK ACTIONS GRID */}
        <Text style={dashboardStyles.sectionTitle}>Quick Actions</Text>
        <View style={dashboardStyles.grid}>
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
        <TouchableOpacity
          style={dashboardStyles.logoutBtn}
          onPress={() => navigation.replace('Splash')}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.primary} />
          <Text style={dashboardStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const ActionCard = ({ title, icon, color, onPress }) => (
  <TouchableOpacity style={dashboardStyles.actionCard} onPress={onPress}>
    <View style={[dashboardStyles.iconBox, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <Text style={dashboardStyles.actionCardText}>{title}</Text>
  </TouchableOpacity>
);
