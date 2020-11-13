import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import posed from 'react-native-pose';

import { MOVIE_CONTENT_WIDTH, SPACE_LG2, SPACE_SM } from "./sizes";
import { Colors } from "./colors";
import { ContentStyles } from './styles';

import { Rating } from "./Rating";
import { Tagger } from "./Tagger";

export const PoseContainer = posed()({
    collapse: {
        contentWidth: MOVIE_CONTENT_WIDTH - SPACE_LG2,
        overviewHeight: 0,
        overviewOpacity: 0
    },
    expand: {
        contentWidth: MOVIE_CONTENT_WIDTH,
        overviewHeight: -1,
        overviewOpacity: 1
    }
});

export default class Content extends Component {
    render() {
        const { item, onReadMore, open, onPressTagged,onwatching } = this.props;

        return (
            <PoseContainer>
                {({ contentWidth, overviewHeight, overviewOpacity }) => (
                    <Animated.ScrollView scrollEnabled={open}>
                        <Animated.View style={[ContentStyles.container, {
                            width: contentWidth,
                        }]}>
                            <Text style={ContentStyles.title}>
                                {item.name}
                            </Text>
                            <View style={ContentStyles.ratingControl}>
                                <Rating
                                    rating={item.rating}
                                    size={24}
                                />
                                <Text style={ContentStyles.ratingNumber}>
                                    {item.rating}
                                </Text>
                            </View>
                            <View style={ContentStyles.shortDetailsWrapper}>
                                <View style={ContentStyles.shortDetails}>
                                    <MaterialIcons
                                        name="access-time"
                                        size={16}
                                        color={Colors.darkGray}
                                    />
                                    <Text style={ContentStyles.shortDetailsText}>
                                        {item.runtime} min
                                    </Text>
                                </View>
                                <View style={ContentStyles.shortDetails}>
                                    <MaterialCommunityIcons
                                        name="movie-roll"
                                        size={16}
                                        color={Colors.darkGray}
                                    />
                                    <Text style={ContentStyles.shortDetailsText}>
                                        {item.release}
                                    </Text>
                                </View>
                            </View>

                            <View style={ContentStyles.shortDetails}>
                                <TouchableOpacity
                                    onPress={() => onPressTagged && onPressTagged({ item })}
                                    style={{
                                        alignItems: 'center'
                                    }}>
                                    <Tagger tags={[item.genres]} />
                                </TouchableOpacity>
                            </View>

                            <Animated.View style={{
                                height: overviewHeight,
                                opacity: overviewOpacity,
                                justifyContent: 'center',
                                marginTop: SPACE_SM,
                            }}>
                                <Text>{item.plot}</Text>
                            </Animated.View>

                            <Animated.View style={{
                                height: overviewHeight,
                                opacity: overviewOpacity,
                                backgroundColor: '#7EC58C',
                                marginTop: SPACE_SM,
                                width: '100%',
                                borderRadius: 100,
                            }}>
                                <TouchableHighlight
                                    style={{
                                        width: '100%',
                                        height: 50,
                                        padding: 10,

                                    }}
                                    underlayColor='rgba(0,0,0,0)' 
                                    onPress={() => onwatching && onwatching({ item })}
                                    >
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 20,
                                        color: '#fff',
                                    }}>Watching</Text>
                                </TouchableHighlight>
                            </Animated.View>

                            <View style={{
                                marginTop: SPACE_SM,
                                justifyContent: 'flex-end',
                            }}>
                                <TouchableOpacity
                                    onPress={() => onReadMore && onReadMore({ item })}
                                    style={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="chevron-down"
                                        size={24}
                                        color={Colors.darkGray}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </Animated.ScrollView>
                )}
            </PoseContainer>
        );
    }
}

Content.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        imdbid: PropTypes.number,
        href: PropTypes.string,
        year: PropTypes.number,
        rated: PropTypes.string,
        release: PropTypes.string,
        runtime: PropTypes.string,
        write: PropTypes.string,
        actor: PropTypes.string,
        plot: PropTypes.string,
        language: PropTypes.string,
        country: PropTypes.string,
        awards: PropTypes.string,
        rating: PropTypes.number,
        poster: PropTypes.string,
        genres: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            poster: PropTypes.string,
        })
    }).isRequired,
    onReadMore: PropTypes.func,
    onPressTagged: PropTypes.func,
    onwatching:PropTypes.func
};

