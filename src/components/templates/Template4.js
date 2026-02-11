
import React from "react";
import { View, Text } from "react-native";

const COLORS = {
  background: "#0F0F0F",
  card: "#1B1B1B",
  primary: "#8B1E3F",
  textPrimary: "#FFFFFF",
  textSecondary: "#999999"
};

export default function Template4({ cardData = {}, userData = {}, dashboardData = {}, thumbnail = false }) {
  const fullName = dashboardData?.fullName || 
                   `${userData?.first || ''} ${userData?.last || ''}`.trim() || 
                   cardData?.fullName || 'John Developer';
  
  const designation = (dashboardData?.designation && dashboardData.designation.trim()) || (cardData?.jobTitle && cardData.jobTitle.trim()) || '';
  const email = (dashboardData?.email && dashboardData.email.trim()) || (userData?.email && userData.email.trim()) || (cardData?.email && cardData.email.trim()) || '';
  const phone = (dashboardData?.phone1 && dashboardData.phone1.trim()) || (cardData?.phone && cardData.phone.trim()) || '';
  const company = (cardData?.companyName && cardData.companyName.trim()) || '';
  const whatsapp = (cardData?.whatsapp && cardData.whatsapp.trim()) || '';
  const linkedin = (cardData?.linkedin && cardData.linkedin.trim()) || '';
  const instagram = (cardData?.instagram && cardData.instagram.trim()) || '';
  const twitter = (cardData?.twitter && cardData.twitter.trim()) || '';
  const website = (cardData?.website && cardData.website.trim()) || '';

  // Extract initials from full name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (thumbnail) {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.card, padding: 8, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ color: COLORS.textPrimary, fontWeight: '700' }}>{getInitials(fullName)}</Text>
        </View>
        <Text numberOfLines={1} style={{ color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' }}>{fullName}</Text>
        {designation && <Text numberOfLines={1} style={{ color: COLORS.primary, fontSize: 9 }}>{designation}</Text>}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        width: '85%',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 32,
        alignItems: 'center'
      }}>
        {/* Large Initials Circle */}
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 28
        }}>
          <Text style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: COLORS.textPrimary
          }}>
            {getInitials(fullName)}
          </Text>
        </View>

        {/* Name */}
        <Text style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          marginBottom: 8
        }}>
          {fullName}
        </Text>

        {/* Job Title */}
        <Text style={{
          fontSize: 14,
          color: COLORS.primary,
          fontWeight: '600',
          marginBottom: 8
        }}>
          {designation}
        </Text>

        {company && (
          <Text style={{
            fontSize: 13,
            color: COLORS.textSecondary,
            marginBottom: 16
          }}>
            {company}
          </Text>
        )}

        {/* Phone */}
        {phone && (
          <Text style={{
            fontSize: 13,
            color: COLORS.textSecondary,
            marginBottom: 6
          }}>
            {phone}
          </Text>
        )}

        {/* Email */}
        {email && (
          <Text style={{
            fontSize: 13,
            color: COLORS.textSecondary
          }}>
            {email}
          </Text>
        )}
      </View>
    </View>
  );
}
