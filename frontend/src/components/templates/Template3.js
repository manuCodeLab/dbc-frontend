import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/templates/template3Styles";

export default function Template3({ cardData = {} }) {
  const { 
    fullName = 'NANDASHREE TR', 
    jobTitle = 'FRON END DEVELOPER',
    handle = '@ venturebiz',
    subtitle = 'asdfghu',
    email = 'nandaramurakrishna@gm...',
    phone = '7892872499',
    location = 'Banglore'
  } = cardData;
  
  const truncateEmail = (email) => {
    if (email.length > 25) return email.substring(0, 22) + '...';
    return email;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{fullName.toUpperCase()}</Text>
        <Text style={styles.role}>{jobTitle.toUpperCase()}</Text>
        <View style={styles.divider} />
        <Text style={styles.handle}>{handle}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.contactBox}>
          <Text style={styles.contactItem}>📧 {truncateEmail(email)}</Text>
          <Text style={styles.contactItem}>📞 {phone}</Text>
          <Text style={styles.contactItem}>📍 {location}</Text>
        </View>
      </View>
    </View>
  );
}
