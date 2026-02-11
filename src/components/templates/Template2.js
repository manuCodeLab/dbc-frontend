
import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = {
  background: "#111111",
  card: "#1E1E1E",
  primary: "#D4AF37",
  textPrimary: "#FFFFFF",
  textSecondary: "#CCCCCC"
};

export default function Template2({ cardData = {}, userData = {}, dashboardData = {}, thumbnail = false }) {
  const fullName = dashboardData?.fullName || 
                   `${userData?.first || ''} ${userData?.last || ''}`.trim() || 
                   cardData?.fullName || 'Sarah Smith';
  
  const designation = dashboardData?.designation || cardData?.jobTitle || 'Professional';
  const email = dashboardData?.email || userData?.email || cardData?.email || '';
  const phone = dashboardData?.phone1 || cardData?.phone || '';
  const linkedin = cardData?.linkedin || '';
  const twitter = cardData?.twitter || '';
  const instagram = cardData?.instagram || '';
  const website = cardData?.website || '';

  if (thumbnail) {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.card, padding: 8, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ color: COLORS.background, fontWeight: '700' }}>{fullName.charAt(0).toUpperCase()}</Text>
        </View>
        <Text numberOfLines={1} style={{ color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' }}>{fullName}</Text>
        {designation && <Text numberOfLines={1} style={{ color: COLORS.textSecondary, fontSize: 9 }}>{designation}</Text>}
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
        {/* Avatar Circle */}
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <Text style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: COLORS.background
          }}>
            {fullName.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Name */}
        <Text style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          marginBottom: 4
        }}>
          {fullName}
        </Text>

        {/* Role */}
        <Text style={{
          fontSize: 14,
          color: COLORS.textSecondary,
          marginBottom: 24
        }}>
          {designation}
        </Text>

        {/* Email and Phone */}
        {email && (
          <Text style={{
            fontSize: 12,
            color: COLORS.textSecondary,
            marginBottom: 4,
            textAlign: 'center'
          }}>
            {email}
          </Text>
        )}
        {phone && (
          <Text style={{
            fontSize: 12,
            color: COLORS.textSecondary,
            marginBottom: 24,
            textAlign: 'center'
          }}>
            {phone}
          </Text>
        )}

        {/* Social Icons Row */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20
        }}>
          {linkedin && <MaterialCommunityIcons name="linkedin" size={28} color={COLORS.primary} />}
          {twitter && <MaterialCommunityIcons name="twitter" size={28} color={COLORS.primary} />}
          {instagram && <MaterialCommunityIcons name="instagram" size={28} color={COLORS.primary} />}
          {website && <MaterialCommunityIcons name="globe" size={28} color={COLORS.primary} />}
        </View>
      </View>
    </View>
  );
}
