import React from 'react'
import { FlatList,Text, StyleSheet,AsyncStorage,View, TouchableHighlight, ImageBackground,  Image,
} from 'react-native'
import styles from './styles'
import axios from 'axios';
import { withNavigationFocus } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import {urls} from '../../urls';
import {RECOMMENT_WIDTH} from '../../AppStyles';
const ACCESS_TOKEN = 'access_token';
var i =1;
class Recommend extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            access_token: '',
            loading: false,
            data : [],
            error: null,
            is_login:false,
        };
        
        // this.getToken = this.getToken.bind(this);
      }
      
      // static getDerivedStateFromProps(props, state) {
        // return {isFocused: props.isFocused };
      // }
      
      componentDidUpdate(prevProps){        
          if(this.props.isFocused===true&& prevProps.isFocused ===false){
            this.getToken();
        }
      }

      componentDidMount() {
          this.getToken();  
      }


    async getToken() {
      try {      
        let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
        if(!accessToken) {
            this.setState({access_token:null,data:[]});
        }
        else{
          this.setState({access_token:accessToken});
          this.showItems(accessToken);
        }
      } catch(error) {
          console.log("Something went wrong");
      }
    }

     showItems (token) {
        const { current_page } = this.state;
        const url = `http://35.198.241.114/api/recommend/movies/`;
        var self = this;
        
        self.setState({loading: true});
    
        axios.get(url,{
          headers: {
            Authorization: 'token ' + token
          }
        })
        .then(function(response){
            const data = response.data;
            self.setState({data: data,
                           error: response.error || null,
                           loading: false,
                           });
        }).catch(function(error){
            self.setState({ error, loading: false });
        })
    }
    
    onPressRecipe = item => {
        this.props.navigation.navigate('Recipe', { item });
      };


      _renderItem({item,index}) {
        return (    
        <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
          <View style={styles.container_slide}>
          <Image style={styles.photo_slide} source={{ uri: item.poster }} />
        <Text style={styles.title}>{item.name + " ("+ item.year+")"}</Text>
        <Text style={styles.runtime}>{item.runtime}</Text>
        <Text style={styles.category}>{item.genres.name}</Text>
          </View>
        </TouchableHighlight>     
           );
        }

  render() {
    const { access_token } = this.state;
    return (
      <View>
      {access_token ? 
        <View>
        {access_token ? <Text style={styles.header}>Movie for you</Text>:null}            
         <Carousel layout={'default'}
              ref={(c) => { this._carousel = c; }}
              data={this.state.data}
              renderItem={(item) => this._renderItem(item)}
              sliderWidth={RECOMMENT_WIDTH}
              itemWidth={500}
            />
      </View>
      :null}
     </View>
      );
  }
}


export default withNavigationFocus(Recommend);
// export default Recommend