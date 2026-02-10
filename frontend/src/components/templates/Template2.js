
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

export default function Template2({ cardData = {}, thumbnail = false }) {
  const fullName = cardData?.fullName || 'Sarah Smith';
  const jobTitle = cardData?.jobTitle || 'Professional';
  const handle = cardData?.handle || '@sarahsmith';

  if (thumbnail) {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.card, padding: 8, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ color: COLORS.background, fontWeight: '700' }}>{fullName.charAt(0).toUpperCase()}</Text>
        </View>
        <Text numberOfLines={1} style={{ color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' }}>{fullName}</Text>
        <Text numberOfLines={1} style={{ color: COLORS.textSecondary, fontSize: 9 }}>{jobTitle}</Text>
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
          {jobTitle}
        </Text>

        {/* Social Icons Row */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20
        }}>
          <MaterialCommunityIcons name="linkedin" size={28} color={COLORS.primary} />
          <MaterialCommunityIcons name="twitter" size={28} color={COLORS.primary} />
          <MaterialCommunityIcons name="instagram" size={28} color={COLORS.primary} />
          <MaterialCommunityIcons name="github" size={28} color={COLORS.primary} />
        </View>
      </View>
    </View>
  );
}
