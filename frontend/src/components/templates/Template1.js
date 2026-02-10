import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/templates/template1Styles";

export default function Template1({ cardData = {} }) {
  const fullName = cardData?.fullName || 'BRAND NAME';
  const jobTitle = cardData?.jobTitle || 'TAGLINE SPACE';
  
  return (
    <View style={styles.container}>
      <View style={styles.bgPattern} />
      <View style={styles.content}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>◆</Text>
        </View>
        <Text style={styles.name}>{fullName.toUpperCase()}</Text>
        <Text style={styles.tagline}>{jobTitle.toUpperCase()}</Text>
      </View>
    </View>
  );
}
