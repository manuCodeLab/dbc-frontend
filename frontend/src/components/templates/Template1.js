
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = {
  background: "#0D0D0D",
  card: "#1A1A1A",
  primary: "#8B1E3F",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B0B0"
};

export default function Template1({ cardData = {}, thumbnail = false }) {
  const fullName = cardData?.fullName || 'John Doe';
  const jobTitle = cardData?.jobTitle || 'Professional';
  const email = cardData?.email || 'john@example.com';
  const phone = cardData?.phone || '+1 (555) 000-0000';

  if (thumbnail) {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.card, padding: 8, justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' }}>{fullName}</Text>
        <Text numberOfLines={1} style={{ color: COLORS.primary, fontSize: 9 }}>{jobTitle}</Text>
        <View style={{ position: 'absolute', bottom: 8, left: 8 }}>
          <Text style={{ color: COLORS.textSecondary, fontSize: 9 }}>{phone}</Text>
        </View>
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
        {/* Name */}
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          marginBottom: 8
        }}>
          {fullName}
        </Text>

        {/* Role */}
        <Text style={{
          fontSize: 14,
          color: COLORS.primary,
          fontWeight: '600',
          marginBottom: 32
        }}>
          {jobTitle}
        </Text>

        {/* Call Button */}
        <TouchableOpacity style={{
          width: '100%',
          backgroundColor: COLORS.primary,
          paddingVertical: 12,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 12
        }}>
          <MaterialCommunityIcons name="phone" size={18} color={COLORS.textPrimary} style={{ marginRight: 8 }} />
          <Text style={{ color: COLORS.textPrimary, fontSize: 14, fontWeight: '600' }}>
            Call: {phone}
          </Text>
        </TouchableOpacity>

        {/* Email Button */}
        <TouchableOpacity style={{
          width: '100%',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: COLORS.primary,
          paddingVertical: 12,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MaterialCommunityIcons name="email-outline" size={18} color={COLORS.primary} style={{ marginRight: 8 }} />
          <Text style={{ color: COLORS.primary, fontSize: 14, fontWeight: '600' }}>
            {email}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
