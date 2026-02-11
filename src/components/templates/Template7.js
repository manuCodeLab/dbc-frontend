import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/templates/template7Styles";

export default function Template7({ cardData = {} }) {
  const fullName = cardData?.fullName || 'Professional Name';
  const jobTitle = cardData?.jobTitle || 'Job Title';
  const email = cardData?.email || 'email@example.com';
  const phone = cardData?.phone || '+1 (555) 000-0000';
  const location = cardData?.location || 'City, Country';

  return (
    <View style={styles.container}>
      {/* Gradient Background with Brush Strokes */}
      <View style={styles.brushStroke1} />
      <View style={styles.brushStroke2} />
      <View style={styles.brushStroke3} />

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
        <Text style={{fontSize: 10, color: '#666', marginTop: 6}}>{email}</Text>
        <Text style={{fontSize: 10, color: '#666', marginVertical: 2}}>{phone}</Text>
        <Text style={{fontSize: 10, color: '#666'}}>{location}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Social Icons with Art Style */}
      <View style={styles.socialRow}>
        <View style={styles.socialDot}>
          <Text style={styles.dot}>●</Text>
        </View>
        <View style={styles.socialDot}>
          <Text style={styles.dot}>●</Text>
        </View>
        <View style={styles.socialDot}>
          <Text style={styles.dot}>●</Text>
        </View>
      </View>
    </View>
  );
}
