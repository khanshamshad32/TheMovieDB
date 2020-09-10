import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

export default ({style, onPress, source, activeOpacity = 1}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <Image source={source} style={style} />
    </TouchableOpacity>
  );
};
