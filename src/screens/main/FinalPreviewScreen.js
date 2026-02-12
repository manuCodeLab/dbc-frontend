import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ClassicTemplate from '../../components/templates/ClassicTemplate';
import ModernTemplate from '../../components/templates/ModernTemplate';
import MinimalTemplate from '../../components/templates/MinimalTemplate';
import DarkTemplate from '../../components/templates/DarkTemplate';

const TEMPLATE_COMPONENTS = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  dark: DarkTemplate,
};

export default function FinalPreviewScreen({ route, navigation }) {
  const { selectedTemplate, userData: routeUserData } = route?.params || {};
  const [userData, setUserData] = useState(routeUserData || {});

  // Load real user data from storage if not provided in route
  React.useEffect(() => {
    if (!routeUserData || Object.keys(routeUserData).length === 0) {
      (async () => {
        try {
          const { getUser } = await import('../../utils/storage');
          const user = await getUser();
          if (user) {
            setUserData(user);
          }
        } catch (e) {
          console.log('Error loading user:', e);
        }
      })();
    }
  }, [routeUserData]);

  // User data with fallbacks
  const finalUserData = {
    name: userData?.name || userData?.fullName || 'Your Name',
    title: userData?.title || userData?.designation || 'Your Title',
    email: userData?.email || 'your.email@example.com',
    phone: userData?.phone || '+1 (555) 000-0000',
    company: userData?.company || userData?.organization || 'Your Company',
    website: userData?.website || 'www.yourwebsite.com',
  };

  const SelectedComponent = TEMPLATE_COMPONENTS[selectedTemplate] || ClassicTemplate;

  const handleSaveCard = useCallback(() => {
    Alert.alert(
      'Save Card',
      `Your ${selectedTemplate} template card has been saved successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to home or dashboard
            navigation.navigate('Landing');
          },
        },
      ]
    );
  }, [selectedTemplate, navigation]);

  const handleDownloadCard = useCallback(() => {
    Alert.alert(
      'Download Card',
      `Your card is being downloaded...`,
      [
        {
          text: 'OK',
          onPress: () => console.log('Card downloaded'),
        },
      ]
    );
  }, []);

  const handleShareCard = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out my digital business card! Name: ${finalUserData.name}, Title: ${finalUserData.title}`,
        title: 'My Digital Business Card',
      });
    } catch (error) {
      Alert.alert('Share Error', error.message);
    }
  }, [finalUserData]);

  const handleEditCard = useCallback(() => {
    navigation.navigate('PersonalDetails', {
      cardData: finalUserData,
      editMode: true,
    });
  }, [finalUserData, navigation]);

  const handleSelectDifferentTemplate = useCallback(() => {
    navigation.navigate('SelectTemplate', {
      cardData: finalUserData,
    });
  }, [finalUserData, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#D4AF37" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Card Preview</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Template Name */}
        <View style={styles.templateNameSection}>
          <Text style={styles.templateLabel}>Template:</Text>
          <Text style={styles.templateName}>
            {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
          </Text>
        </View>

        {/* Card Preview */}
        <View style={styles.previewContainer}>
          <SelectedComponent
            userData={finalUserData}
            isSelected={true}
          />
        </View>

        {/* Card Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Contact Information</Text>
          
          <View style={styles.detailRow}>
            <Ionicons name="person" size={18} color="#D4AF37" />
            <Text style={styles.detailText}>{finalUserData.name}</Text>
          </View>

          {finalUserData.title && (
            <View style={styles.detailRow}>
              <Ionicons name="briefcase" size={18} color="#D4AF37" />
              <Text style={styles.detailText}>{finalUserData.title}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Ionicons name="mail" size={18} color="#D4AF37" />
            <Text style={styles.detailText}>{finalUserData.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="call" size={18} color="#D4AF37" />
            <Text style={styles.detailText}>{finalUserData.phone}</Text>
          </View>

          {finalUserData.company && (
            <View style={styles.detailRow}>
              <Ionicons name="business" size={18} color="#D4AF37" />
              <Text style={styles.detailText}>{finalUserData.company}</Text>
            </View>
          )}

          {finalUserData.website && (
            <View style={styles.detailRow}>
              <Ionicons name="globe" size={18} color="#D4AF37" />
              <Text style={styles.detailText}>{finalUserData.website}</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsTitle}>What would you like to do?</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSaveCard}
          >
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Save This Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={handleEditCard}
          >
            <Ionicons name="pencil" size={20} color="#D4AF37" />
            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
              Edit Information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonTertiary]}
            onPress={handleSelectDifferentTemplate}
          >
            <Ionicons name="layers" size={20} color="#D4AF37" />
            <Text style={[styles.actionButtonText, styles.actionButtonTextTertiary]}>
              Choose Different Template
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomActionsRow}>
            <TouchableOpacity
              style={[styles.bottomActionButton, styles.downloadButton]}
              onPress={handleDownloadCard}
            >
              <Ionicons name="download" size={18} color="#D4AF37" />
              <Text style={styles.bottomActionText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomActionButton, styles.shareButton]}
              onPress={handleShareCard}
            >
              <Ionicons name="share-social" size={18} color="#D4AF37" />
              <Text style={styles.bottomActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  templateNameSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  templateLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 4,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D4AF37',
  },
  previewContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailsSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  detailText: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 12,
    flex: 1,
  },
  actionsSection: {
    paddingHorizontal: 16,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionButtonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  actionButtonTertiary: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  actionButtonTextSecondary: {
    color: '#D4AF37',
  },
  actionButtonTextTertiary: {
    color: '#1F1F1F',
  },
  bottomActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  bottomActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  downloadButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  shareButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  bottomActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D4AF37',
  },
});
