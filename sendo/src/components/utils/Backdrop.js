import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, View,Text} from 'react-native';

import {BackdropStyles} from './styles';

const Backdrop = ({item}) => {
    return (
        <View style={BackdropStyles.container}>
        <Image
            style={BackdropStyles.image}
            blurRadius={2}
            source={{uri:item.poster}}
            resizeMode="cover"
        />
        </View>
    );
    };


Backdrop.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        imdbid: PropTypes.number,
        href: PropTypes.string,
        year: PropTypes.number,
        rated: PropTypes.string,
        release:PropTypes.string,
        runtime:PropTypes.string,
        write:PropTypes.string,
        actor:PropTypes.string,
        plot:PropTypes.string,
        language:PropTypes.string,
        country:PropTypes.string,
        awards:PropTypes.string,
        rating:PropTypes.number,
        poster:PropTypes.string,
        genres:PropTypes.shape({
            id:PropTypes.number,
            name:PropTypes.string,
            poster:PropTypes.string,
        })
    }).isRequired,
};

export {Backdrop};
