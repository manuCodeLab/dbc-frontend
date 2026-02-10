import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colorsDefault from "../../styles/colors";
import styles from "../../styles/screens/selectTemplateStyles";

import Template1 from "../../components/templates/Template1";
import Template2 from "../../components/templates/Template2";
import Template3 from "../../components/templates/Template3";
import Template4 from "../../components/templates/Template4";

export default function SelectTemplateScreen({ route, navigation }) {
  const [selected, setSelected] = useState(null);
  const cardData = route.params?.cardData || {};

  const templates = [
    { id: 1, name: 'Glass', component: <Template1 cardData={cardData} /> },
    { id: 2, name: 'Minimal', component: <Template2 cardData={cardData} /> },
    { id: 3, name: 'Modern', component: <Template3 cardData={cardData} /> },
    { id: 4, name: 'Bold', component: <Template4 cardData={cardData} /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colorsDefault.accent} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Template</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Choose a template</Text>
          <Text style={styles.subtitle}>for your digital business card</Text>
        </View>

        {/* Template Cards - One by One */}
        <View style={styles.templatesContainer}>
          {templates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={[styles.templateCard, selected === template.id && styles.templateCardSelected]}
              onPress={() => setSelected(template.id)}
            >
              {/* Card Preview */}
              <View style={styles.cardPreviewWrapper}>
                {template.component}
              </View>

              {/* Template Name */}
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>{template.name}</Text>
              </View>

              {/* Selection Radio Button */}
              <View style={[styles.radioButton, selected === template.id && styles.radioButtonSelected]}>
                {selected === template.id && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.continueButton, !selected && styles.continueButtonDisabled]} 
          onPress={() => selected && navigation.navigate('TemplatePreview', { templateId: selected, cardData })}
          disabled={!selected}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.continueButtonText}>View Preview</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
