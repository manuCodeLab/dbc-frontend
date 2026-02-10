import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/templates/template4Styles";

export default function Template4({ cardData = {} }) {
  const { 
    fullName = 'NANDASHREE TR', 
    email = 'nandaramurak...',
    phone = '7892872499',
    location = 'Banglore',
    jobTitle = 'PROFESSIONAL'
  } = cardData;
  
  const truncateEmail = (email) => {
    if (email.length > 20) return email.substring(0, 17) + '...';
    return email;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.nameLeft}>{fullName.toUpperCase()}</Text>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>CONTACT</Text>
          <Text style={styles.contactItem}>📧 {truncateEmail(email)}</Text>
          <Text style={styles.contactItem}>📞 {phone}</Text>
        </View>
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>LOCATION & SKILLS</Text>
          <Text style={styles.locationItem}>📍 {location}</Text>
          <Text style={styles.skillTag}>{jobTitle.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );
}
