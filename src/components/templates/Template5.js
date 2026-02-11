import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/templates/template5Styles";

export default function Template5({ cardData = {} }) {
  const fullName = cardData?.fullName || 'Professional Name';
  const jobTitle = cardData?.jobTitle || 'Job Title';
  const email = cardData?.email || 'email@example.com';
  const phone = cardData?.phone || '+1 (555) 123-4567';
  const location = cardData?.location || 'City, Country';
  const handle = cardData?.handle || '@handle';

  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.leafPattern} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarRing}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{fullName.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.title}>{jobTitle}</Text>
        <Text style={{fontSize: 10, color: '#777', marginTop: 4}}>{handle}</Text>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactLabel}>{email}</Text>
        <Text style={styles.contactLabel}>{phone}</Text>
        <Text style={styles.contactLabel}>{location}</Text>
      </View>

      {/* QR Code Placeholder */}
      <View style={styles.qrSection}>
        <View style={styles.qrPlaceholder}>
          <Text style={styles.qrText}>QR</Text>
        </View>
      </View>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <View style={styles.socialIcon}>
          <Text style={styles.socialText}>in</Text>
        </View>
        <View style={styles.socialIcon}>
          <Text style={styles.socialText}>@</Text>
        </View>
        <View style={styles.socialIcon}>
          <Text style={styles.socialText}>f</Text>
        </View>
      </View>
    </View>
  );
}
