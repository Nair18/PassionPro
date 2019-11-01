import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,

  ActivityIndicator
} from "react-native";
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
export default class PdfViewer extends Component {
  state = {
          WEBVIEW_REF: "weViewRed",
          loading: false,
          url: this.props.navigation.state.params.URL
        };
  static navigationOptions = {
    header: null
  }
  render() {

    return (
     <View style={{ flex: 1 }}>
             <Header loading={this.state.loading} />
             {this.state.url !== null ?
             <WebView
               source={{ uri: "https://drive.google.com/viewerng/viewer?url="+ this.state.url }}

               onLoadStart={() => this.setState({ loading: true })}
               onLoadEnd={() => this.setState({ loading: false })}
             />: <View><Spinner color="black"/></View>}
           </View>
    );
  }
}

const Header = ({ loading }) => (
  <View style={styles.header}>
    <Text style={styles.title}>PDF Viewer</Text>
    <Text note style={styles.subTitle}>powered by PassionPro</Text>
    {loading ? <ActivityIndicator color="blue" /> : null}
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff"
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  subTitle:{
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  icon: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff"
  }
});