import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ModernTemplate from '../../components/templates/ModernTemplate';
import DarkTemplate from '../../components/templates/DarkTemplate';
import ClassicTemplate from '../../components/templates/ClassicTemplate';
import MinimalTemplate from '../../components/templates/MinimalTemplate';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import Footer from '../../components/common/Footer';
import { layoutStyles } from '../../styles/screens/personalDetailsLayoutStyles';
import { getUser } from '../../utils/storage';
import styles from '../../styles/screens/templatePreviewStyles';


const TemplatePreviewScreen = ({ route, navigation }) => {
  const { cardData, template } = route.params;
  const [userInitial, setUserInitial] = React.useState('N');

  React.useEffect(() => {
    let mounted = true;
    const loadUser = async () => {
      try {
        const user = await getUser();
        if (mounted && user) {
          const name = user.first || user.fullName || user.firstName || '';
          const initial = name && name.trim().length ? name.trim().charAt(0).toUpperCase() : 'N';
          setUserInitial(initial);
        }
      } catch (e) {
        // ignore
      }
    };
    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  // Handle navigation focus
  useFocusEffect(
    React.useCallback(() => {
      // Optional: Add any initialization logic here
      return () => {
        // Optional: Add any cleanup logic here
      };
    }, [])
  );

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={cardData} />;
      case 'dark':
        return <DarkTemplate data={cardData} />;
      case 'classic':
        return <ClassicTemplate data={cardData} />;
      case 'minimal':
        return <MinimalTemplate data={cardData} />;
      default:
        return <ModernTemplate data={cardData} />;
    }
  };

  const handleSaveCard = () => {
    // Navigate back to LandingScreen
    navigation.navigate('Landing');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
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
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Template Preview */}
        <View style={styles.previewContainer}>
          {renderTemplate()}
        </View>

        {/* Save Card Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveCard}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save Card</Text>
        </TouchableOpacity>

        {/* Additional spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      <Footer activeTab="" navigation={navigation} fromScreen="TemplatePreview" />
    </ScreenWrapper>
  );
};

export default TemplatePreviewScreen;
