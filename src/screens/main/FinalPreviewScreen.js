import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Share,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ClassicTemplate from '../../components/templates/ClassicTemplate';
import ModernTemplate from '../../components/templates/ModernTemplate';
import MinimalTemplate from '../../components/templates/MinimalTemplate';
import DarkTemplate from '../../components/templates/DarkTemplate';
import Footer from '../../components/common/Footer';
import { layoutStyles } from '../../styles/screens/personalDetailsLayoutStyles';
import { getUser, getDashboard, saveDashboard } from '../../utils/storage';


const TEMPLATE_COMPONENTS = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  dark: DarkTemplate,
};

export default function FinalPreviewScreen({ route, navigation }) {
  // Receive cardData and template from navigation params
  const { cardData = {}, template = 'classic' } = route?.params || {};
  const [userInitial, setUserInitial] = useState('N');
  // Use cardData for contact info display
  const finalUserData = {
    name: cardData.name || cardData.fullName || 'Your Name',
    title: cardData.title || cardData.designation || 'Your Title',
    email: cardData.email || 'your.email@example.com',
    phone: cardData.phone || '+1 (555) 000-0000',
    company: cardData.company || cardData.organization || 'Your Company',
    website: cardData.website || 'www.yourwebsite.com',
  };

  useEffect(() => {
    let mounted = true;
    const loadUser = async () => {
      try {
        const user = await getUser();
        if (mounted && user) {
          const name = user?.first || user?.fullName || user?.firstName || '';
          let initial = 'N';
          if (typeof name === 'string' && name.trim().length > 0) {
            initial = name.trim().charAt(0).toUpperCase();
          }
          setUserInitial(initial);
        } else {
          setUserInitial('N');
        }
      } catch (e) {
        setUserInitial('N');
      }
    };
    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  // Use cardData directly for the template

  const SelectedComponent = TEMPLATE_COMPONENTS[template] || ClassicTemplate;

  const handleSaveCard = useCallback(async () => {
    try {
      // Load existing dashboard cards
      const dashboard = (await getDashboard()) || [];
      // Prepare card data to save
      const cardToSave = {
        ...finalUserData,
        template,
        savedAt: Date.now(),
      };
      // Add new card to dashboard
      await saveDashboard([cardToSave, ...dashboard]);
      Alert.alert(
        'Save Card',
        `Your ${template} template card has been saved successfully!`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Landing');
            },
          },
        ]
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to save card.');
    }
  }, [template, navigation, finalUserData]);

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

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* ========== HEADER SECTION ========== */}
      <View style={layoutStyles.headerSection}>
        {/* Back Button */}
        <TouchableOpacity 
          onPress={handleBack}
          style={{ width: 24, justifyContent: 'center', alignItems: 'center' }}
        >
          <Ionicons name="chevron-back" size={28} color="#D4AF37" />
        </TouchableOpacity>

        {/* App Title */}
        <Text style={layoutStyles.appTitle}>
          DIGITAL BUSINESS CARD
        </Text>

        {/* Profile Icon */}
        <TouchableOpacity 
          style={layoutStyles.profileIcon}
          onPress={navigateToProfile}
        >
          <Text style={layoutStyles.profileIconText}>{userInitial}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Template Name */}
        <View style={styles.templateNameSection}>
          <Text style={styles.templateLabel}>Template:</Text>
          <Text style={styles.templateName}>
            {(template ? template.charAt(0).toUpperCase() + template.slice(1) : 'Classic')}
          </Text>
          {/* Template Color Display */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Text style={{ fontSize: 12, color: '#999', marginRight: 8 }}>Color:</Text>
            {(() => {
              // Template color mapping
              const colorMap = {
                classic: '#1565C0',
                modern: 'linear-gradient(90deg, #667EEA, #764BA2)',
                minimal: '#FAFAFA',
                dark: '#1A1A1A',
              };
              const color = colorMap[template] || '#1565C0';
              if (template === 'modern') {
                return (
                  <View style={{ width: 40, height: 16, borderRadius: 8, backgroundColor: '#667EEA', overflow: 'hidden', marginRight: 4 }}>
                    <View style={{ width: 40, height: 16, borderRadius: 8, backgroundColor: '#764BA2', position: 'absolute', left: 20, top: 0 }} />
                  </View>
                );
              }
              return (
                <View style={{ width: 40, height: 16, borderRadius: 8, backgroundColor: color }} />
              );
            })()}
          </View>
        </View>

        {/* Card Preview */}
        <View style={styles.previewContainer}>
          <SelectedComponent data={cardData} />
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
      {/* <Footer activeTab="" navigation={navigation} fromScreen="FinalPreview" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
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
