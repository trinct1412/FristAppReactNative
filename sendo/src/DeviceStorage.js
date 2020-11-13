import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async StorageToken(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    },
    async DeleteToken() {
        try{
          await AsyncStorage.removeItem('access_token')
          .then(
            () => {
              this.setState({
                access_token: ''
              })
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },
      
      async getToken() {
        try {
          const value = await AsyncStorage.getItem('access_token');
          if (value !== null) {
            console.log(value);
          }
        
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }
    
  };

export default deviceStorage;