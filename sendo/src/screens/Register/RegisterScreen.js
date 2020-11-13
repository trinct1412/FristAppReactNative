import React, {
    Component
  } from 'react';
import { 
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    AsyncStorage,
    Button,
} from 'react-native';
  import styles from './styles';
  import {Keyboard, Text, View, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';

  const ACCESS_TOKEN = 'access_token';
  const REFRESH_TOKEN = 'refresh_token';

  class RegisterScreeen extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: "Register"
      };
    };

    constructor(props){
      super(props);
      this.state = {
        email: "",
        password: "",
        name :"",
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

      storeRefreshToken(responseData){
        AsyncStorage.setItem(REFRESH_TOKEN, responseData, (err)=> {
          if(err){
            console.log("an error");
            throw err;
          }
          console.log("success");
        }).catch((err)=> {
            console.log("error is: " + err);
        });
      }
      

      async onRegisterPressed() {
        this.setState({showProgress: true})
        try {
            let formdata = new FormData();
            formdata.append("name", this.state.name);
            formdata.append("email", this.state.email);
            formdata.append("password", this.state.password);
          let response = await fetch('http://35.198.241.114/user/signup/', {
                                  method: 'POST',                                
                                  body: formdata
                                });
          let res = await response.json();
          if (response.status >= 200 && response.status < 300) {
              let accessToken = res;
              this.storeToken(accessToken.access);
              this.storeRefreshToken(accessToken.refresh);
          } else {
              let error = res;
              throw error;
          }
        } catch(error) {
            this.setState({error: error});
            console.log("error " + error);
            this.setState({showProgress: false});
        }
      }

      render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                <Text style={styles.logoText}>Register</Text>
          
            
                <TextInput
              onChangeText={ (name)=> this.setState({name}) }
              style={styles.loginFormTextInput} placeholder="name">
            </TextInput>

            <TextInput
              onChangeText={ (email)=> this.setState({email}) }
              style={styles.loginFormTextInput} placeholder="email">
            </TextInput>
            
            <TextInput
              onChangeText={ (password)=> this.setState({password}) }
              style={styles.loginFormTextInput}
              placeholder="password"
              secureTextEntry={true}>
            </TextInput>
       
            <Button
              buttonStyle={styles.loginButton}
              onPress={this.onRegisterPressed.bind(this)} 
              title="Register"
            />
 {/* <Errors errors={this.state.errors}/> */}

        </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
        );
      }
  }
//   const Errors = (props) => {
    // return (
    //   <View>
//         {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
//       </View>
//     );
//   }
  export default RegisterScreeen
