import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/templates/template2Styles";

export default function Template2({ cardData = {} }) {
  const fullName = cardData?.fullName || 'BRAND NAME';
  const jobTitle = cardData?.jobTitle || 'SLOGAN GOES HERE';
  
  return (
    <View style={styles.container}>
      <View style={styles.bgCurve1} />
      <View style={styles.bgCurve2} />
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>◎</Text>
        </View>
        <Text style={styles.name}>{fullName.toUpperCase()}</Text>
        <Text style={styles.tagline}>{jobTitle.toUpperCase()}</Text>
      </View>
    </View>
  );
}
