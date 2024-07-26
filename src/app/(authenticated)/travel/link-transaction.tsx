/* eslint-disable simple-import-sort/imports */
// WebViewScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
  // const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://app.midtrans.com/payment-links/38151721964844' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
  },
});

export default WebViewScreen;
