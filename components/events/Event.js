// @flow

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,TouchableOpacity
} from 'react-native';
import {Content} from 'native-base';
import Workspace from '../screens/workspace';
import Logs from '../screens/Logs';
import type { EventType } from '../../App';

export default class Event extends Component {
  constructor(props){
   super(props)
   this.state={
     type: this.props.type
   }
  }

  showAlert= () => {
    Alert.alert(
      'Hello boss'
    )
  }
  render() {
    const { event, index } = this.props;
    const {
      date,
      title,
      description,
      image,
    } = event;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate(this.state.type)}>
        <Content>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{date.calendar()}</Text>
          <Text style={[styles.text, styles.title]}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
        </Content>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 15,
  },
  imageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 15,
    width: 90,
    height: 90,
  },
  textContainer: {
    flex: 1,
  },
  image: {
    width: 89,
    height: 89,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});