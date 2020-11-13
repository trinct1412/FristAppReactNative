import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { LinearGradient } from 'expo-linear-gradient';

export default class LandingScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Landing',
        header: null,
      });

    constructor(props) {
        super(props);
        this.state = {
          showRealApp: false,
        };
      }
      _onDone = () => {
        this.props.navigation.navigate('Home');
      };
      _onSkip = () => {
        this.props.navigation.navigate('Home');
      };
      _renderItem = ({ item }) => {
        return (
            <LinearGradient
            colors={['#7EC58C', '#439153', '#2fa146']}
            style={{
                flex: 1,
                // backgroundColor: item.backgroundColor,
                justifyContent: 'space-around',
                paddingBottom: 100
              }}>
          <View
          style={{alignItems: 'center',}}
          >
            <Image style={styles.image} source={item.image.uri} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
          </LinearGradient>

        );
      };
      render() {
          return (
            <AppIntroSlider
              slides={slides}
              renderItem={this._renderItem}
              onDone={this._onDone}
              showSkipButton={true}
              onSkip={this._onSkip}
              bottomButton
            />
          );
        }
    }
    const styles = StyleSheet.create({
      image: {
        width: 200,
        height: 200,
      },
      text: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 30,
      },
      title: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        marginTop:25,
        marginBottom: 16,
      },
    });
     
    const slides = [
      {
        key: 's1',
        text: 'Discover the newty released list of movies and get notification',
        title: 'New released movies',
        image: {
          uri:
          require('../../../assets/icons/landing3.png'),
        },
        backgroundColor: '#febe29',
      },
      {
        key: 's2',
        title: 'Discover',
        text: 'Find out movies, reviews, events and more you like to know',
        image: {
          uri:
          require('../../../assets/icons/landing2.png'),
        },
        backgroundColor: '#febe29',
      },
      {
        key: 's3',
        title: 'Join the community',
        text: 'Join the discusion and leave your reviews to let the world know your thoughts',
        image: {
          uri: require('../../../assets/icons/landing1.png'),
        },
        backgroundColor: '#22bcb5',
      },
    ];




