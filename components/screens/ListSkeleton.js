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

export default class ListSkeleton extends Component {
    render(){
        return(
            <Fragment>
                {[0, 1, 2, 3, 4].map((_, index) => (
                                <View key={index} style={{ marginBottom: 12 }}>
                                  <SkeletonPlaceholder>
                                    <View style={{ flexDirection: "row" }}>
                                      <View style={{ width: 100, height: 100 }} />

                                      <View
                                        style={{
                                          justifyContent: "space-between",
                                          marginLeft: 12,
                                          flex: 1
                                        }}
                                      >
                                        <View style={{ width: "50%", height: 20 }} />
                                        <View style={{ width: "30%", height: 20 }} />
                                        <View style={{ width: "80%", height: 20 }} />
                                      </View>
                                    </View>
                                  </SkeletonPlaceholder>
                                </View>
                              ))}
            </Fragment>
        );
    }
}