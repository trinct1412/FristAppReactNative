import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, Image} from 'react-native';

import {POSTER_IMAGE_HEIGHT,POSTER_CONTAINER_WIDTH} from './sizes';
import {PosterStyles} from './styles';

const Poster = ({style, poster}) => {
    return (
        <Animated.View style={[PosterStyles.container, style]}>
        <Image
            style={[PosterStyles.poster, {
                width: POSTER_CONTAINER_WIDTH ,
                height: POSTER_IMAGE_HEIGHT 
            }]}
            resizeMode="cover"
            source={{uri:poster}}
        />
    </Animated.View>
    );
    }; 

Poster.propTypes = {
    poster: PropTypes.string.isRequired,
};

export {Poster};