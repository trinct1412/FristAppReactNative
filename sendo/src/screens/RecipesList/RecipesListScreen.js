import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import {urls} from '../../urls';

export default class RecipesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name') ? navigation.getParam('name') : navigation.getParam('title')
    };
  };

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        data : [],
        current_page : 1,
        page : 1,
        error: null,
    };
  }

  componentDidMount() {
    this.showItems();
  }

  showItems = () =>{
    const { current_page } = this.state;
    const url = `http://35.198.241.114/api/movies/?format=json&genres_id=${this.props.navigation.getParam('genre').id}&page=${current_page}`;
    var self = this;
    self.setState({loading: true});

    axios.get(url)
    .then(function(response){
        const data = response.data;
        self.setState({data: data.results,
                       error: response.error || null,
                       loading: false,
                       page: data.count});
    }).catch(function(error){
        self.setState({ error, loading: false });
    })
}

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.poster }} />
        <Text style={styles.title}>{item.name + " ("+ item.year+")"}</Text>
        <Text style={styles.runtime}>{item.runtime}</Text>
        <Text style={styles.category}>{this.props.navigation.getParam('genre').name}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('genre');
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.data}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
