import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet, Text, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import Image from './common/image';
import {getPopularMovies, likeMovie} from '../redux/actionCreator/movie';
import {imagePath} from '../api';
import {getFormatedDate} from '../util';

const PopularMovies = ({
  movies,
  total_pages,
  page = 0,
  error,
  fetchMovies,
  rateMovie,
  lastUpdate,
}) => {
  useEffect(() => {
    fetchMovies(1);
  }, []);

  if (error != null) ToastAndroid.show(error.toString());

  const onRatePress = (item, like) => {
    rateMovie(item.id, like);
  };

  const item = ({item, index}) => {
    if (index == movies.length && (page < total_pages || page == 0)) {
      return (
        <Text
          key={Date.now.toString()}
          style={styles.loadMoreTextStyle}
          onPress={() => {
            fetchMovies(page + 1);
          }}>
          {page > 0
            ? 'Load more movies'
            : 'Error loading movies \nClick to load again'}
        </Text>
      );
    }
    let date = new Date(item.release_date);

    let likeIcon =
      item.like === true
        ? require('../../images/thumbsupsel.png')
        : require('../../images/thumbsup.png');
    let dislikeIcon =
      item.like === false
        ? require('../../images/thumbsdownsel.png')
        : require('../../images/thumbsdown.png');

    return (
      <View style={styles.itemContainerStyle}>
        <Image
          source={{uri: imagePath(item.poster_path)}}
          style={styles.posterStyle}
        />
        <View style={styles.itemRightContainerStyle}>
          <Text style={styles.titleStyle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.dateStyle}>{`[${getFormatedDate(date)}]`}</Text>
          <Text style={styles.overviewStyle}>{item.overview}</Text>
          <View style={styles.likeContainerStyle}>
            <Image
              activeOpacity={0.4}
              onPress={() => {
                onRatePress(item, true);
              }}
              source={likeIcon}
              style={styles.likeStyle}
            />
            <Image
              activeOpacity={0.2}
              onPress={() => {
                onRatePress(item, false);
              }}
              source={dislikeIcon}
              style={styles.likeStyle}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      extraData={lastUpdate}
      keyExtractor={(item) => `${item.id}`}
      data={[...movies, '']}
      renderItem={item}
      style={styles.containerStyle}
    />
  );
};

const mapStateToProps = ({moviesReducer}) => {
  return moviesReducer;
};

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (page) => dispatch(getPopularMovies(page)),
  rateMovie: (id, like) => dispatch(likeMovie(id, like)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
    flex: 1,
  },
  itemContainerStyle: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    aspectRatio: 1.9,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  posterStyle: {
    height: '100%',
    aspectRatio: 0.7,
  },
  itemRightContainerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
    overflow: 'hidden',
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateStyle: {
    fontSize: 13,
    color: 'grey',
    paddingBottom: 10,
  },
  overviewStyle: {
    flex: 1,
    fontSize: 13,
  },
  likeContainerStyle: {
    marginTop: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  likeStyle: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },
  loadMoreTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'blue',
    fontStyle: 'italic',
    marginVertical: 20,
    padding: 10,
  },
});
