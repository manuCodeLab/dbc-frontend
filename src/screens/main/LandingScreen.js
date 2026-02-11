import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { landingStyles } from '../../styles/screens/landingStyles';
import COLORS from '../../styles/colors';
import { getDBCUsers } from '../../utils/contacts';
import { clearUser } from '../../utils/storage';

export default function LandingScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const users = await getDBCUsers();
      setContacts(users || []);
      setFilteredContacts(users || []);
    } catch (error) {
      console.log('Error loading contacts:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(
        (contact) =>
          (contact.name && contact.name.toLowerCase().includes(text.toLowerCase())) ||
          (contact.designation && contact.designation.toLowerCase().includes(text.toLowerCase()))
      );
      setFilteredContacts(filtered);
    }
  };

  const handleCreateCard = () => {
    navigation.navigate('PersonalDetails');
  };

  const handleHomePress = () => {
    setActiveTab('home');
  };

  const handleContactsPress = () => {
    setActiveTab('contacts');
    navigation.navigate('Contacts');
  };

  const handleProfilePress = () => {
    setActiveTab('profile');
    navigation.navigate('Profile');
  };

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleMicPress = () => {
    setIsListening(true);
    // Simulate voice input after 2 seconds
    setTimeout(() => {
      setIsListening(false);
      Alert.alert('Voice Search', 'Voice recognition feature enabled');
    }, 2000);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await clearUser();
          setMenuVisible(false);
          navigation.navigate('Login');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleSettings = () => {
    setMenuVisible(false);
    Alert.alert('Settings', 'Settings screen coming soon!');
  };

  const handleHelp = () => {
    setMenuVisible(false);
    Alert.alert('Help', 'Help & Support screen coming soon!');
  };

  return (
    <SafeAreaView style={landingStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* ========== HEADER ========== */}
      <View style={landingStyles.headerSection}>
        <TouchableOpacity 
          style={landingStyles.menuButton}
          onPress={handleMenuPress}
        >
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={landingStyles.profileButton}
          onPress={handleProfilePress}
        >
          <Ionicons name="person-circle" size={40} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {/* ========== SEARCH BAR ========== */}
        <View style={landingStyles.searchSection}>
          <View style={landingStyles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              style={landingStyles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={handleMicPress}>
              <Ionicons name="mic" size={20} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ========== CONTACTS LIST ========== */}
        <View style={landingStyles.contactsListContainer}>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <TouchableOpacity 
                key={index} 
                style={landingStyles.contactCard}
                onPress={() => navigation.navigate('SelectTemplate', { contact })}
              >
                <View style={landingStyles.contactInfo}>
                  <Text style={landingStyles.contactName}>{contact.name || 'Unknown'}</Text>
                </View>
                <View style={landingStyles.contactCategory}>
                  <Text style={landingStyles.contactCategoryText}>
                    {contact.designation || contact.companyName || 'Professional'}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={landingStyles.emptyContainer}>
              <Ionicons name="person-add" size={60} color={COLORS.accent} />
              <Text style={landingStyles.emptyText}>No contacts found</Text>
              <TouchableOpacity 
                style={landingStyles.createButton}
                onPress={handleCreateCard}
              >
                <Ionicons name="add-circle" size={20} color="#FFF" />
                <Text style={landingStyles.createButtonText}>Create Your Card</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {filteredContacts.length > 0 && (
          <View style={landingStyles.actionContainer}>
            <TouchableOpacity 
              style={landingStyles.createButton}
              onPress={handleCreateCard}
            >
              <Ionicons name="add-circle" size={20} color="#FFF" />
              <Text style={landingStyles.createButtonText}>Create Your Card</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>

      {/* ========== FOOTER TABS ========== */}
      <View style={landingStyles.footerTabs}>
        <TouchableOpacity 
          style={[landingStyles.footerTab, activeTab === 'home' && landingStyles.footerTabActive]}
          onPress={handleHomePress}
        >
          <Ionicons 
            name={activeTab === 'home' ? 'home' : 'home-outline'} 
            size={24} 
            color={activeTab === 'home' ? COLORS.accent : '#999'}
          />
          <Text style={[landingStyles.footerTabLabel, activeTab === 'home' && landingStyles.footerTabLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[landingStyles.footerTab, activeTab === 'contacts' && landingStyles.footerTabActive]}
          onPress={handleContactsPress}
        >
          <Ionicons 
            name={activeTab === 'contacts' ? 'people' : 'people-outline'} 
            size={24} 
            color={activeTab === 'contacts' ? COLORS.accent : '#999'}
          />
          <Text style={[landingStyles.footerTabLabel, activeTab === 'contacts' && landingStyles.footerTabLabelActive]}>
            Contacts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[landingStyles.footerTab, activeTab === 'profile' && landingStyles.footerTabActive]}
          onPress={() => navigation.push('Profile', { fromScreen: 'Landing' })}
        >
          <Ionicons 
            name={activeTab === 'profile' ? 'person' : 'person-outline'} 
            size={24} 
            color={activeTab === 'profile' ? COLORS.accent : '#999'}
          />
          <Text style={[landingStyles.footerTabLabel, activeTab === 'profile' && landingStyles.footerTabLabelActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* ========== MENU MODAL ========== */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setMenuVisible(false)}
        >
          <View style={{ position: 'absolute', top: 60, right: 10, backgroundColor: '#FFF', borderRadius: 8, width: 200, elevation: 5 }}>
            <TouchableOpacity 
              style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE', flexDirection: 'row', alignItems: 'center' }}
              onPress={handleSettings}
            >
              <Ionicons name="settings" size={20} color={COLORS.accent} />
              <Text style={{ marginLeft: 12, fontSize: 16, color: '#000' }}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE', flexDirection: 'row', alignItems: 'center' }}
              onPress={handleHelp}
            >
              <Ionicons name="help-circle" size={20} color={COLORS.accent} />
              <Text style={{ marginLeft: 12, fontSize: 16, color: '#000' }}>Help & Support</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}
              onPress={handleLogout}
            >
              <Ionicons name="log-out" size={20} color="#FF0000" />
              <Text style={{ marginLeft: 12, fontSize: 16, color: '#FF0000' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ========== VOICE SEARCH INDICATOR ========== */}
      {isListening && (
        <Modal visible={isListening} transparent animationType="fade">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
            <View style={{ backgroundColor: '#FFF', padding: 30, borderRadius: 16, alignItems: 'center' }}>
              <Ionicons name="mic-circle" size={60} color={COLORS.accent} />
              <Text style={{ marginTop: 16, fontSize: 18, fontWeight: 'bold', color: '#000' }}>Listening...</Text>
              <Text style={{ marginTop: 8, fontSize: 14, color: '#999' }}>Speak now</Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
