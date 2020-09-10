import ActionConstants from '../constant';

const defaultState = {
  movies: [],
  total_results: 0,
  total_pages: 0,
  page: 0,
  lastUpdate: null,
};
export default moviesReducer = (state = defaultState, action) => {
  console.log('Reducer action :', action);
  switch (action.type) {
    case ActionConstants.GET_POPULAR_MOVIES_SUCCESS:
      let movies = state.movies;
      let {total_results, total_pages, page, results} = action.payload;

      return {
        error: undefined,
        total_pages,
        total_results,
        page,
        lastUpdate: Date.now(),
        movies: page == 1 ? results : movies.concat(results),
      };
    case ActionConstants.GET_POPULAR_MOVIES_FAILED:
      return {...state, error: action.payload, lastUpdate: Date.now()};

    case ActionConstants.LIKE_POPULAR_MOVIES: {
      let {movies} = state;
      let {id, like} = action.payload;
      let movie = movies.find((item) => item.id == id);

      if (movie != null) movie.like = movie.like === like ? null : like;

      return {...state, lastUpdate: Date.now()};
    }
    default:
      return state;
  }
};
