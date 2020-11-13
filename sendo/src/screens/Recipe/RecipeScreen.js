import React from 'react';
import {
    ScrollView,
    View,
    Animated,
} from 'react-native';

import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import { MOVIE_CONTENT_HEIGHT, MOVIE_CONTENT_WIDTH, POSTER_CONTAINER_WIDTH, screen, SPACE_LG } from "../../components/utils/sizes";
import { Backdrop } from "../../components/utils/Backdrop";

import Content from "../../components/utils/Content";
import { Poster } from "../../components/utils/Poster";
import {Header} from "../../components/utils/Header";
import posed from 'react-native-pose';

const PoseContainer = posed()({
    collapse: {
        containerHMargin: SPACE_LG,
        containerVMargin: screen.height / 3,
        containerHeight: MOVIE_CONTENT_HEIGHT+40,
        posterOpacity: 1,
        singlePosterTX: 0,
        singlePosterTY: 0,
        singlePosterScale: 1
    },
    expand: {
        containerHMargin: 0,
        containerVMargin: screen.height / 4,
        containerHeight: screen.height - screen.height / 4,
        posterOpacity: 0,
        singlePosterTX: -100,
        singlePosterTY: -50,
        singlePosterScale: 0.5
    }
});


export default class RecipeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: 'true',
            headerLeft: (
                <BackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            pose: 'collapse',
        };
    }

    readMorePressed = ({ item }) => {
        this.setState({
            pose: this.state.pose === 'collapse'
                ? 'expand'
                : 'collapse',
            active: this.state.pose === 'collapse'
                ? true
                : false,
        });


    };

    onPressTagged = ({item}) => {
        let genre = item.genres;
        let name = item.genres.name;
        this.props.navigation.navigate('RecipesList', {genre, name} );
    }
    onwatching = ({item}) => {
        let title = item.name;
        this.props.navigation.navigate('IngredientsDetails', {item,title} );
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');

        return (
            <View style={styles.container}>
                <View style={styles.backdrop}>
                    <ScrollView
                        ref={(ref) => this.scrollBack = ref}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={true}
                        scrollEnabled={false}
                    >
                        <Backdrop item={item} />
                    </ScrollView>
                </View>

                <PoseContainer pose={this.state.pose}>
                    {
                        ({ containerHMargin, containerVMargin, containerHeight }) => (
                            <Animated.View style={[styles.contentBackground, {
                                marginHorizontal: containerHMargin,
                                marginTop: containerVMargin,
                                height: containerHeight
                            }]}>
                                <ScrollView
                                    ref={(ref) => this.scrollCont = ref}
                                    style={styles.contentRoller}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    removeClippedSubviews={true}
                                    scrollEnabled={false}
                                >
                                    <Content
                                        item={item}
                                        open={this.state.active}
                                        onReadMore={this.readMorePressed}
                                        onPressTagged={this.onPressTagged}
                                        onwatching={this.onwatching}
                                    />
                                </ScrollView>
                            </Animated.View>
                        )
                    }
                </PoseContainer>
                        {/* {
                        this.state.active &&
                        <PoseContainer initialPose={'collapse'} pose={this.state.pose}>
                            {
                                ({ singlePosterTX, singlePosterTY, singlePosterScale }) => (
                                    <Poster
                                        style={{
                                            position: 'absolute',
                                            transform: [
                                                { translateX: singlePosterTX },
                                                { translateY: singlePosterTY },
                                                { scaleX: singlePosterScale },
                                                { scaleY: singlePosterScale },
                                            ]
                                        }}
                                        poster={item.poster}
                                    />
                                )
                            }
                        </PoseContainer>
                    } */}


                <View style={styles.posterWrapper}>
                    <PoseContainer pose={this.state.pose}>
                        {
                            ({ posterOpacity }) => (
                                    <Poster
                                        poster={item.poster}
                                        style={{
                                            opacity: !this.state.active ? 1 : 0
                                        }}
                                    />
                            )
                        }
                    </PoseContainer>
                    {
                        this.state.active &&
                        <PoseContainer initialPose={'collapse'} pose={this.state.pose}>
                            {
                                ({ singlePosterTX, singlePosterTY, singlePosterScale }) => (
                                    <Poster
                                        style={{
                                            position: 'absolute',
                                            transform: [
                                                { translateX: singlePosterTX },
                                                { translateY: singlePosterTY },
                                                { scaleX: singlePosterScale },
                                                { scaleY: singlePosterScale },
                                            ]
                                        }}
                                        poster={item.poster}
                                    />
                                )
                            }
                        </PoseContainer>
                    }
                </View>

                

                {/* <Header
              title= {`Watching ${item.name}`}
              canBack={false}
              onBack={this.backPressed}
          /> */}
            </View>
        );
    }
}
