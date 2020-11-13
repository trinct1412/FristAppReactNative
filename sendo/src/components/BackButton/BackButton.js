import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class BackButton extends React.Component {
  render() {
    return (
      <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.props.onPress} style={styles.btnContainer}>
        <Image source={require('../../../assets/icons/backArrowwhite.png')} style={styles.btnIcon} />
      </TouchableHighlight>
    );
  }
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
