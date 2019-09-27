import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';

export default class Uploader extends Component {
  ActivityIndicatorLoadingView = () => {
     //making a view to show to while loading the webpage
     return (
       <ActivityIndicator
          color="#009688"
          size="large"
          style={styles.ActivityIndicatorStyle}
       />
     );
  }
  render() {
    return (
      <WebView
        source={{uri: 'https://happy-independence.herokuapp.com'}}
        style={styles.WebViewStyle}
        javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={this.ActivityIndicatorLoadingView}
      />
    );
  }
}

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 40,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});