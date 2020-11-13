import React, {
    Component
  } from 'react';
import { 
    AsyncStorage,
} from 'react-native';
  import styles from './styles';
  import {Keyboard, Text, View, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
  import axios from 'axios';
  import {urls} from '../../urls';

  const ACCESS_TOKEN = 'access_token';

  class LogoutScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            access_token: '',
        };
     }
    
      getToken = async () => {
        try {
          let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
          this.setState({accessToken});
          console.log("lougout");
        } catch(error) {
            console.log("worng logout");
        }
      }
    
       onLogoutPressed() {
        const { current_page } = this.state;
        const url = `http://35.198.241.114/api/user/rtoken/`;
        var self = this;    
        axios.get(url,{
          headers: {
            Authorization: 'token ' + self.state.token
          }
        })
        .then(function(response){
            self.setState({accessToken:null});
            console.log("success logout");
        }).catch(function(error){
            console.log(error);
        })
      }

    removeTokenUser= async () => {
        try {
          await AsyncStorage.removeItem(ACCESS_TOKEN);
          this.props.navigation.navigate('Home');
        }
        catch(exception) {
          return false;
        }
      }

      componentDidMount() {
        this.getToken();
        this.onLogoutPressed();
        this.removeTokenUser();
      }

      render() {
        return (
            <Text>MayBe You Like!</Text>                            
        );
      }
      
  }

  export default LogoutScreen
