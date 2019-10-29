import React, {Fragment,Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
  Modal,
  TouchableHighlight,
  View,
  AppState,
} from 'react-native';

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default class ProfileSkeleton extends Component {
    render(){
        return(
            <Fragment>
                <SkeletonPlaceholder>
                          <View style={{ width: "100%", height: 140 }} />
                          <View
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 100,
                              borderWidth: 5,
                              borderColor: "white",
                              alignSelf: "center",
                              position: "relative",
                              top: -50
                            }}
                          />
                          <View style={{ width: 120, height: 20, alignSelf: "center" }} />
                          <View
                            style={{
                              width: 240,
                              height: 20,
                              alignSelf: "center",
                              marginTop: 12
                            }}
                          />
                        </SkeletonPlaceholder>
            </Fragment>
        );
    }
}