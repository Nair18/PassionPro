import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import {Button,Text} from 'native-base';
class Step extends PureComponent {
  state = {};
  render() {
    return (
      <View style={styles.root}>
        {this.props.children({
          onChangeValue: this.props.onChangeValue,
          values: this.props.values,
        })}
        <View style={styles.buttonWrapper}>
          <Button
            rounded
            disabled={this.props.currentIndex === 0}
            onPress={this.props.prevStep}
          ><Text>Prev</Text></Button>
          {this.props.isLast ? (
            <Button rounded onPress={this.props.onSubmit}><Text>Submit</Text></Button>
          ) : (
            <Button rounded onPress={this.props.nextStep}><Text>Next</Text></Button>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    height: 80,
    justifyContent: 'space-around',
  },
});

export default Step;