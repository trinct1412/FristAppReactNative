import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image, RefreshControl, ActivityIndicator } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import axios from 'axios';
import Recommend from '../Recommend/Recommend';
import { urls } from '../../urls';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';


export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.current_page = 1;
    this.state = {
      loading: false,
      isRefreshing: false,
      data: [],
      page: 1,
      error: null,
      listHeight: 0,
      scrollViewHeight: 0,
    };
  }

  componentDidMount() {
    this.showItems();
  }

  showItems = () => {
    const { current_page } = this;
    const url = `http://35.198.241.114/api/movies/?format=json&page=${current_page}`;
    var self = this;
    self.setState({ loading: true });

    axios.get(url)
      .then(function (response) {
        const data = response.data;
        self.setState({
          data: data.results,
          error: response.error || null,
          loading: false,
          page: data.count
        });

      }).catch(function (error) {
        self.setState({ error, loading: false });
      })
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  title_slice = title => {
    let sub_title = title;
    if (sub_title.length > 10) {
      sub_title = sub_title.substring(0, 10) + "...";
    }
    return sub_title;
  }

  _renderItem({ item }) {
    return (
      <TouchableHighlight underlayColor='rgba(0,0,0,0)'  onPress={() => this.onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.poster }} />
          <Text style={styles.title}>{this.title_slice(item.name) + " (" + item.year + ")"}</Text>
          <Text style={styles.runtime}>{item.runtime}</Text>
          <Text style={styles.category}>{item.genres.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
        }}
      />
    );
  };

  onRefresh() {
    this.setState({ isRefreshing: true });
    const url = `http://35.198.241.114/api/movies/?format=json&page=1`;
    axios.get(url)
      .then(res => {
        let data = res.data.results;
        this.setState({ isRefreshing: false, data: data });
      })
      .catch(error => {
        this.setState({ isRefreshing: false, error: 'Something just went wrong' });
      });
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };

  handleLoadMore = () => {
    if (!this.state.loading) {
      this.current_page = this.current_page + 1;
      this.showItems();
    }
  };

  render() {
    if (this.state.loading && this.page === 1) {
      return <View style={{
        width: '100%',
        height: '100%'
      }}><ActivityIndicator style={{ color: '#000' }} /></View>;
    }
    return (
      <ScrollView
        style={{ width: '100%', height: '100%' }}
      refreshControl={
        <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.onRefresh.bind(this)}
          title="Loading..."
          />
         }
      >
        <Recommend navigation={this.props.navigation} />
        <Text style={styles.header}>Movies</Text>
        <View >
          <FlatList
            alwaysBounceVertical={false}
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.data}
            renderItem={(item) => this._renderItem(item)}
            keyExtractor={item => `${item.imdbid.toString()}`}
            extraData={this.state}
            // onEndReachedThreshold={0.5}
            // ItemSeparatorComponent={this.renderSeparator}
            // ListFooterComponent={this.renderFooter.bind(this)}
            // onEndReached={this.handleLoadMore.bind(this)}

            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.isRefreshing}
            //     onRefresh={this.onRefresh.bind(this)}
            //     title="Loading..."
            //   />
            // }
          />

        </View>
        
        <View style={styles.infoContainer}>
      <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.handleLoadMore}>
       <View style={styles.containerbutton}>
         <Text style={styles.textbutton}>LoadMore</Text>
       </View>
     </TouchableHighlight>
      </View>
      </ScrollView>
    );
  }
}

