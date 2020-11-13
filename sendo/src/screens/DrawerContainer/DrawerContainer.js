import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';
import { AsyncStorage} from 'react-native'

const ACCESS_TOKEN = 'access_token';

class DrawerContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        access_token: '',
        is_login:false,
        drawerOpen: false,
        cards: [],
    };
 }

 
  getToken = async ()=>{
    try {
      var accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (accessToken){
      this.setState({access_token:accessToken,is_login:true});
      }
      } catch(error) {
        console.log(error);
    }
  }


  componentDidUpdate(){
    if(this.state.is_login===false){
      this.getToken();
    }
  }


  componentDidMount() {
    this.getToken();
  }

  render() {
    const { navigation } = this.props;
    const { access_token, is_login } = this.state;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="GENRES"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="SEARCH"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          />

          {is_login === false ? 
          <MenuButton
            title="LOGIN"
            source={require('../../../assets/icons/cookie50.png')}
            onPress={() => {
              navigation.navigate('Login');
              navigation.closeDrawer();
            }}
          /> :  <MenuButton
          title="LOGOUT"
          source={require('../../../assets/icons/cookie50.png')}
          onPress={() => {
            navigation.navigate('Logout');
            navigation.closeDrawer();
            this.setState({is_login:false});
          }}
        />}

        </View>
      </View>
    
 
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};

export default DrawerContainer;