import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { getCardDraft } from '../../utils/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/screens/templatePreviewStyles';
import COLORS from '../../styles/colors';

import Template1 from '../../components/templates/Template1';
import Template2 from '../../components/templates/Template2';
import Template3 from '../../components/templates/Template3';
import Template4 from '../../components/templates/Template4';
import Template5 from '../../components/templates/Template5';
import Template6 from '../../components/templates/Template6';
import Template7 from '../../components/templates/Template7';

const templates = [
  { id: 1, name: 'Glass', component: Template1 },
  { id: 2, name: 'Minimal', component: Template2 },
  { id: 3, name: 'Modern', component: Template3 },
  { id: 4, name: 'Bold', component: Template4 },
  { id: 5, name: 'Sage', component: Template5 },
  { id: 6, name: 'Network', component: Template6 },
  { id: 7, name: 'Artist', component: Template7 },
];

export default function TemplatePreviewScreen({ route, navigation }) {
  const templateId = route.params?.templateId || 1;
  const cardDataFromRoute = route.params?.cardData || {};
  const [cardData, setCardData] = useState(cardDataFromRoute || {});
  const currentTemplateInfo = templates.find(t => t.id === templateId);
  const CurrentTemplate = currentTemplateInfo?.component;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        if (!cardDataFromRoute || Object.keys(cardDataFromRoute).length === 0) {
          const draft = await getCardDraft();
          if (mounted && draft && Object.keys(draft).length) {
            setCardData(draft);
          }
        } else {
          setCardData(cardDataFromRoute);
        }
      } catch (e) {
        // ignore
      }
    };
    load();
    return () => { mounted = false; };
  }, [cardDataFromRoute]);

  const handleBackToSelect = () => {
    navigation.goBack();
  };

  const handleSaveTemplate = () => {
    // TODO: Implement save to templates
  };

  const handleDownload = () => {
    // TODO: Implement download card
  };

  const handleShare = () => {
    // TODO: Implement share card
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        
        {/* Header Section with Title and Avatar */}
        <View style={styles.topHeader}>
          <View style={styles.headerContent}>
            <View style={styles.headerTitleSection}>
              <Ionicons name="card" size={28} color={COLORS.accent} />
              <Text style={styles.appTitle}>DIGITAL BUSINESS CARD</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{cardData?.fullName?.charAt(0)?.toUpperCase() || 'N'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardPreview}>
            {CurrentTemplate && <CurrentTemplate cardData={cardData} />}
          </View>
        </View>

        {/* Tip Section */}
        <View style={styles.tipSection}>
          <Text style={styles.tipText}>
            💡 <Text style={styles.tipBold}>Tip:</Text> Click on any text to copy it, icons to open links, and images to view them larger.
          </Text>
        </View>
        

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          
          <TouchableOpacity style={styles.backLink} onPress={handleBackToSelect}>
            <Ionicons name="chevron-back" size={20} color="#000" />
            <Text style={styles.backLinkText}>Back to Templates</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveTemplate}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />
            <Text style={styles.saveButtonText}>Save to My Templates</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
            <Ionicons name="download" size={20} color="#fff" />
            <Text style={styles.downloadButtonText}>Download Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>Share Card</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
