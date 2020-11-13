import React, {
    Component
  } from 'react';
import { 
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Image,
} from 'react-native';
  import styles from './styles';
  import {Text, View, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';

  const ACCESS_TOKEN = 'access_token';

  class LoginScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: "Login",
        header: null,
      };
    };

    constructor(props){
      super(props);
      this.state = {
        email: "",
        password: "",
        error: "",
        showProgress: false,
      }
    }
  
      storeToken(responseData){
        AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
          if(err){
            console.log("an error");
            throw err;
          }
          console.log("success");
        }).catch((err)=> {
            console.log("error is: " + err);
        });
      }

      async onLoginPressed() {
        this.setState({showProgress: true})
        try {
            let formdata = new FormData();
            formdata.append("username", this.state.email);
            formdata.append("password", this.state.password);
          let response = await fetch('http://35.198.241.114/api/user/token/', {
                                  method: 'POST',                                
                                  body: formdata
                                });
          let res = await response.json();
          let error
          if (response.status >= 200 && response.status < 300) {
              if(res.token){
              let accessToken = res;
              this.storeToken(accessToken.token);
              this.props.navigation.navigate('Home');
              }
              if(res.non_field_errors){
                error = res.non_field_errors;
              }
          } else {
              error = res;
              throw error;
          }
        } catch(error) {
            this.setState({error: error});
            console.log("error " + error);
            Alert.alert('Email or Password wrong');
            this.setState({showProgress: false});
        }
      }

      render() {
        return (
          <LinearGradient
          colors={['#7EC58C', '#439153', '#2fa146']}  behavior="padding" style={styles.container}>
          <KeyboardAvoidingView style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                style={styles.logo}
                source={require("../../../assets/icons/landing1.png")}
                />
                <Text style={styles.title}>Login Movie Theater</Text>
                </View>

                <View style={styles.formContainer}>
                  <View style={styles.containerInput}>
                    <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    placeholder="username or email"
                    returnKeyType="next"
                    onSubmitEditing={()=> this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={ (email)=> this.setState({email}) }
                    />
                    <TextInput
                    style={styles.input}
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    placeholder="password"
                    secureTextEntry
                    returnKeyType="go"
                    onChangeText={ (password)=> this.setState({password}) }
                    ref={(input)=> this.passwordInput=input}
                     />
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPressed.bind(this)}>
                    <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
              </View>          
          </KeyboardAvoidingView>
          </LinearGradient>
        );
      }
  }

  export default LoginScreen

