import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import {urls} from '../../urls';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: "genres"
  };

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        data : [],
        error: null,
    };
  }

  componentDidMount() {
    this.showCategories();
  }

  showCategories = () =>{
    const url = `http://35.198.241.114/api/genres/?format=json`;
    var self = this;
    
    self.setState({loading: true});

    axios.get(url)
    .then(function(response){
        const data = response.data;
        self.setState({data: data,
                       error: response.error || null,
                       loading: false});
    }).catch(function(error){
        self.setState({ error, loading: false });
    })
}

  onPressGrenres = item => {
    const genre = item;
    const title = item.name;
    this.props.navigation.navigate('RecipesList', { genre, title });
  };

  renderGenres = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressGrenres(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.poster }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderGenres}
          keyExtractor={item => `${item.id.toString()}`}
        />
      </View>
    );
  }
}
