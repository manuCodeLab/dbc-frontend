
import React from "react";
import { View, Text } from "react-native";

const COLORS = {
  background: "#000000",
  card: "#141414",
  primary: "#D4AF37",
  textPrimary: "#FFFFFF",
  textSecondary: "#AAAAAA"
};

export default function Template3({ cardData = {}, thumbnail = false }) {
  const fullName = cardData?.fullName || 'Alexandra Gold';
  const jobTitle = cardData?.jobTitle || 'Executive';
  const phone = cardData?.phone || '+1 (555) 000-0000';
  const email = cardData?.email || 'alex@example.com';
  const location = cardData?.location || 'New York, NY';

  if (thumbnail) {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.card, padding: 8, justifyContent: 'center', alignItems: 'center' }}>
        <Text numberOfLines={1} style={{ color: COLORS.textPrimary, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>{fullName}</Text>
        <View style={{ height: 6 }} />
        <View style={{ width: 40, height: 2, backgroundColor: COLORS.primary, marginBottom: 6 }} />
        <Text numberOfLines={1} style={{ color: COLORS.primary, fontSize: 9 }}>{jobTitle}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        width: '85%',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 40,
        alignItems: 'center'
      }}>
        {/* Name */}
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          marginBottom: 24,
          textAlign: 'center'
        }}>
          {fullName}
        </Text>

        {/* Gold Divider */}
        <View style={{
          width: '60%',
          height: 2,
          backgroundColor: COLORS.primary,
          marginBottom: 24
        }} />

        {/* Role */}
        <Text style={{
          fontSize: 16,
          color: COLORS.primary,
          fontWeight: '600',
          marginBottom: 16,
          textAlign: 'center'
        }}>
          {jobTitle}
        </Text>

        {/* Phone */}
        <Text style={{
          fontSize: 13,
          color: COLORS.textSecondary,
          marginBottom: 8,
          textAlign: 'center'
        }}>
          {phone}
        </Text>

        {/* Email */}
        <Text style={{
          fontSize: 13,
          color: COLORS.textSecondary,
          marginBottom: 8,
          textAlign: 'center'
        }}>
          {email}
        </Text>

        {/* Website */}
        <Text style={{
          fontSize: 13,
          color: COLORS.primary,
          textAlign: 'center'
        }}>
          {location}
        </Text>
      </View>
    </View>
  );
}
