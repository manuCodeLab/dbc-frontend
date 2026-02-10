import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/templates/template6Styles";

export default function Template6({ cardData = {} }) {
  const fullName = cardData?.fullName || 'Professional Name';
  const jobTitle = cardData?.jobTitle || 'Job Title';
  const email = cardData?.email || 'email@example.com';
  const phone = cardData?.phone || '+1 (555) 000-0000';
  const location = cardData?.location || 'City, Country';

  return (
    <View style={styles.container}>
      {/* Network Background Pattern */}
      <View style={styles.networkBg}>
        <View style={styles.dot1} />
        <View style={styles.dot2} />
        <View style={styles.dot3} />
        <View style={styles.dot4} />
        <View style={styles.dot5} />
        <View style={styles.line1} />
        <View style={styles.line2} />
      </View>

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
        <Text style={{fontSize: 9, color: '#00D9FF', marginTop: 6}}>{email}</Text>
        <Text style={{fontSize: 9, color: '#00D9FF'}}>{phone}</Text>
      </View>

      {/* QR Code Large */}
      <View style={styles.qrLarge}>
        <View style={styles.qrGrid}>
          <Text style={styles.qrGridText}>QR CODE</Text>
        </View>
      </View>

      {/* Social Icons */}
      <View style={styles.socialRow}>
        <View style={styles.socialCircle}>
          <Text style={styles.socialIcon}>💼</Text>
        </View>
        <View style={styles.socialCircle}>
          <Text style={styles.socialIcon}>📧</Text>
        </View>
        <View style={styles.socialCircle}>
          <Text style={styles.socialIcon}>🌐</Text>
        </View>
      </View>
    </View>
  );
}
