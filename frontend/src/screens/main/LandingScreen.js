import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { landingStyles } from '../../styles/screens/landingStyles';

export default function LandingScreen({ navigation }) {
  const handleCreateCard = () => {
    navigation.navigate('Dashboard');
  };

  const handleViewProfile = () => {
    navigation.navigate('Dashboard', { screen: 'Profile' });
  };

  return (
    <SafeAreaView style={landingStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
      {/* ========== HEADER SECTION ========== */}
      <View style={landingStyles.headerSection}>
        <View style={landingStyles.logoBox}>
          <Ionicons name="document" size={32} color="#D4AF37" />
        </View>
        <Text style={landingStyles.headerTitle}>DBC</Text>
      </View>

      {/* ========== HERO SECTION ========== */}
      <View style={landingStyles.heroSection}>
        <View style={landingStyles.heroIconContainer}>
          <Ionicons name="card" size={80} color="#D4AF37" />
        </View>
        <Text style={landingStyles.heroTitle}>
          Digital Business Card Creator
        </Text>
        <Text style={landingStyles.heroSubtitle}>
          Create, manage, and share your professional digital business card in minutes
        </Text>
      </View>

      {/* ========== FEATURES SECTION ========== */}
      <View style={landingStyles.featuresSection}>
        <Text style={landingStyles.featuresTitle}>Why Choose DBC?</Text>

        <View style={landingStyles.featureCard}>
          <View style={landingStyles.featureIconBox}>
            <Ionicons name="flash" size={24} color="#D4AF37" />
          </View>
          <View style={landingStyles.featureContent}>
            <Text style={landingStyles.featureCardTitle}>Quick Setup</Text>
            <Text style={landingStyles.featureCardText}>
              Create your card in just 2 simple steps
            </Text>
          </View>
        </View>

        <View style={landingStyles.featureCard}>
          <View style={landingStyles.featureIconBox}>
            <Ionicons name="share-social" size={24} color="#D4AF37" />
          </View>
          <View style={landingStyles.featureContent}>
            <Text style={landingStyles.featureCardTitle}>Easy Sharing</Text>
            <Text style={landingStyles.featureCardText}>
              Share your card via QR, link, or social media
            </Text>
          </View>
        </View>

        <View style={landingStyles.featureCard}>
          <View style={landingStyles.featureIconBox}>
            <Ionicons name="color-palette" size={24} color="#D4AF37" />
          </View>
          <View style={landingStyles.featureContent}>
            <Text style={landingStyles.featureCardTitle}>Custom Design</Text>
            <Text style={landingStyles.featureCardText}>
              Personalize your card with your brand colors
            </Text>
          </View>
        </View>

        <View style={landingStyles.featureCard}>
          <View style={landingStyles.featureIconBox}>
            <Ionicons name="cloud-download" size={24} color="#D4AF37" />
          </View>
          <View style={landingStyles.featureContent}>
            <Text style={landingStyles.featureCardTitle}>Download & Print</Text>
            <Text style={landingStyles.featureCardText}>
              Download your card as PDF or print it directly
            </Text>
          </View>
        </View>
      </View>

      {/* ========== CTA SECTION ========== */}
      <View style={landingStyles.ctaSection}>
        <TouchableOpacity 
          style={landingStyles.primaryButton}
          onPress={handleCreateCard}
        >
          <Ionicons name="add-circle" size={20} color="#0F0F0F" />
          <Text style={landingStyles.primaryButtonText}>Create Your Card</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={landingStyles.secondaryButton}
          onPress={handleViewProfile}
        >
          <Ionicons name="eye" size={20} color="#D4AF37" />
          <Text style={landingStyles.secondaryButtonText}>View My Profile</Text>
        </TouchableOpacity>
      </View>

      {/* ========== INFO SECTION ========== */}
      <View style={landingStyles.infoSection}>
        <View style={landingStyles.infoCard}>
          <Text style={landingStyles.infoNumber}>2</Text>
          <Text style={landingStyles.infoLabel}>Simple Steps</Text>
        </View>
        <View style={landingStyles.infoCard}>
          <Text style={landingStyles.infoNumber}>∞</Text>
          <Text style={landingStyles.infoLabel}>Possibilities</Text>
        </View>
        <View style={landingStyles.infoCard}>
          <Text style={landingStyles.infoNumber}>1</Text>
          <Text style={landingStyles.infoLabel}>Card</Text>
        </View>
      </View>

      {/* ========== FOOTER SECTION ========== */}
      <View style={landingStyles.footerSection}>
        <Text style={landingStyles.footerText}>
          © 2026 Digital Business Card. All rights reserved.
        </Text>
      </View>

      <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
