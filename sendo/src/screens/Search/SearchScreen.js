import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { ListItem, SearchBar } from 'react-native-elements';
import MenuImage from '../../components/MenuImage/MenuImage';
import axios from 'axios';
import {urls} from '../../urls';

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: (
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          round
          onChangeText={text => params.handleSearch(text)}
          placeholder="Search"
          value={params.data}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
        value:'',
        loading: false,
        data : [],
        current_page : 1,
        page : 1,
        error: null,
    };
  }


  showItems = () =>{
    const { value } = this.state;
    const url = `http://35.198.241.114/api/movies/?format=json&name=${value}`;
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


  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      handleSearch: this.handleSearch,
      data: this.getValue
    });
  }

  handleSearch = text => {
    if (text == '') {
      this.setState({
        value: text,
        data: []
      });
    } else {
      this.setState({
        value: text,
        data:  this.showItems()
      });
    }
  };

  getValue = () => {
    return this.state.value;
  };

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
      <Image style={styles.photo} source={{ uri: item.poster }} />
        <Text style={styles.title}>{item.name + " ("+ item.year+")"}</Text>
        <Text style={styles.runtime}>{item.runtime}</Text>
        <Text style={styles.category}>{item.genres.name}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
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
