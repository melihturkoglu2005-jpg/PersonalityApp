import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const CydenzScreen = () => {
  const handleDownload = async () => {
    try {
      // For web build, this will download the file
      // For mobile, we'll try to open the file
      const pdfUrl = './merthoca.pdf';
      
      if (typeof window !== 'undefined') {
        // Web environment - create download link
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'merthoca.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Mobile environment - try to open the file
        await Linking.openURL(pdfUrl);
      }
    } catch (error) {
      Alert.alert('Hata', 'PDF indirilemedi. Lütfen tekrar deneyin.');
      console.error('Download error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.title}>İNDİR</Text>
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
          <Text style={styles.buttonText}>İNDİR CANIM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CydenzScreen;
