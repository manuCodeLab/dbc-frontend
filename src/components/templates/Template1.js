
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

export default function Template1({ cardData = {}, userData = {}, dashboardData = {}, thumbnail = false }) {
  // Merge data from multiple sources
  const fullName = dashboardData?.fullName || 
                   `${userData?.first || ''} ${userData?.last || ''}`.trim() || 
                   cardData?.fullName || 'John Doe';
  
  const designation = (dashboardData?.designation && dashboardData.designation.trim()) || (cardData?.jobTitle && cardData.jobTitle.trim()) || '';
  const email = (dashboardData?.email && dashboardData.email.trim()) || (userData?.email && userData.email.trim()) || (cardData?.email && cardData.email.trim()) || '';
  const phone = (dashboardData?.phone1 && dashboardData.phone1.trim()) || (cardData?.phone && cardData.phone.trim()) || '';
  const company = (cardData?.companyName && cardData.companyName.trim()) || '';
  const whatsapp = (cardData?.whatsapp && cardData.whatsapp.trim()) || '';
  const linkedin = (cardData?.linkedin && cardData.linkedin.trim()) || '';
  const instagram = (cardData?.instagram && cardData.instagram.trim()) || '';
  const twitter = (cardData?.twitter && cardData.twitter.trim()) || '';
  const website = (cardData?.website && cardData.website.trim()) || '';

  if (thumbnail) {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: COLORS.card, padding: 8, justifyContent: 'center' }}>
        <Text numberOfLines={1} style={{ color: COLORS.textPrimary, fontSize: 12, fontWeight: '700' }}>{fullName}</Text>
        {designation && <Text numberOfLines={1} style={{ color: COLORS.primary, fontSize: 9 }}>{designation}</Text>}
        <View style={{ position: 'absolute', bottom: 8, left: 8 }}>
          {phone && <Text style={{ color: COLORS.textSecondary, fontSize: 9 }}>{phone}</Text>}
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

        {/* Designation */}
        <Text style={{
          fontSize: 14,
          color: COLORS.primary,
          fontWeight: '600',
          marginBottom: 8
        }}>
          {designation}
        </Text>

        {/* Company */}
        {company && (
          <Text style={{
            fontSize: 12,
            color: COLORS.textSecondary,
            marginBottom: 24
          }}>
            {company}
          </Text>
        )}

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
            {phone}
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
          alignItems: 'center',
          marginBottom: 24
        }}>
          <MaterialCommunityIcons name="email-outline" size={18} color={COLORS.primary} style={{ marginRight: 8 }} />
          <Text style={{ color: COLORS.primary, fontSize: 14, fontWeight: '600' }}>
            {email}
          </Text>
        </TouchableOpacity>

        {/* Social Media Icons */}
        {(whatsapp || linkedin || instagram || twitter || website) && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            {whatsapp && (
              <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#25D366',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <MaterialCommunityIcons name="whatsapp" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            )}
            {linkedin && (
              <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#0077B5',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <MaterialCommunityIcons name="linkedin" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            )}
            {instagram && (
              <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E4405F',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <MaterialCommunityIcons name="instagram" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            )}
            {twitter && (
              <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#1DA1F2',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <MaterialCommunityIcons name="twitter" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            )}
            {website && (
              <TouchableOpacity style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <MaterialCommunityIcons name="globe" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
