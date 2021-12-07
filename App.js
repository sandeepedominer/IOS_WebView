import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  BackHandler,
  Platform,
  ActivityIndicator 
} from 'react-native';
import { WebView } from 'react-native-webview';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  hideSpinner=()=> {
    this.setState({ visible: false });
  }
  showSpinner=()=> {
    this.setState({ visible: true });
  }
  webView = {
    canGoBack: false,
    ref: null,
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
      <View style={{ position: 'relative', flexDirection: 'row', elevation: 8, padding: (0, 0, 0, 5), justifyContent: 'flex-start', backgroundColor: '#0c73ae', zIndex: 2,marginTop: 30 }}>
                    <View style={{ flexDirection: 'column', paddingLeft: 10, marginTop: 5 }}>
                        <Text style={{  fontSize: 16, alignItems: 'center', color: '#fff' }}>Dealer Portal</Text>
                        <Text style={{ fontSize: 12, alignItems: 'center', color: '#fff' }}>DuraRoof</Text>
                    </View>
                </View>
      <WebView
        source={{ uri: 'http://52.172.218.225/expand/ERP/Duraroof$DuraRoof/p/account/login' }}
        ref={(webView) => { this.webView.ref = webView; }}
        onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
        onLoadStart={() => this.showSpinner()}
        onLoad={() => this.hideSpinner()}
        javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
      />
      {this.state.visible && (
          <ActivityIndicator
            style={styles.activityIndicatorStyle }
            size="large"
            color="#0000ff"
          />
        )}
      </View>
    );
  }

  onBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  // componentWillMount() {
  //     BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  // }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress');
  }
}


handleWebViewNavigationStateChange = (newNavState) => {
  const { url } = newNavState;
  if (!url) return;

  // one way to handle a successful form submit is via query strings
  if (!url.includes('http://52.172.218.225/')) {
    this.webview.stopLoading();
    WebBrowser.openBrowserAsync(url);
    // maybe close this view?
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default App;