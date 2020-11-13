import React from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import { Video } from 'expo-av';

import { StyleSheet } from 'react-native';


export default class IngredientsDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerTitleStyle: {
        fontSize: 16
      }
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { width } = Dimensions.get('window');
	  const paused = true;
    return (
      <View style={styles.container}>
      <Video
  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
  rate={1.0}
  volume={1.0}
  isMuted={false}
  resizeMode={Video.RESIZE_MODE_STRETCH}
  shouldPlay
  isLooping
  useNativeControls
  style={{ width: width, height: 500 }}
/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});