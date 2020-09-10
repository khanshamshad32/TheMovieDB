import ApiConstants from '../../api/constant';
import ActionConstants from '../constant';
import {get} from '../../api';

export const getPopularMovies = (page) => {
  return (dispatch) => {
    get(ApiConstants.POPULAR_MOVIE, {language: 'en-US', page})
      .then((data) =>
        dispatch({
          type: ActionConstants.GET_POPULAR_MOVIES_SUCCESS,
          payload: data,
        }),
      )
      .catch((e) =>
        dispatch({
          type: ActionConstants.GET_POPULAR_MOVIES_FAILED,
          payload: e,
        }),
      );
  };
};

export const likeMovie = (id, like) => {
  return (dispatch) => {
    dispatch({
      type: ActionConstants.LIKE_POPULAR_MOVIES,
      payload: {id, like},
    });
  };
};
