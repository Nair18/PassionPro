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
export default class Uploader extends Component {
  state = {
          WEBVIEW_REF: "weViewRed",
          loading: false
        };
  static navigationOptions = {
    header: null
  }
  render() {

    return (
     <View style={{ flex: 1 }}>
             <Header loading={this.state.loading} />
             <WebView
               source={{ uri: "https://happy-independence.herokuapp.com/" }}

               onLoadStart={() => this.setState({ loading: true })}
               onLoadEnd={() => this.setState({ loading: false })}
             />
           </View>
    );
  }
}

const Header = ({ loading }) => (
  <View style={styles.header}>
    <Text style={styles.title}>Upload Meal & Workout Plans</Text>
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