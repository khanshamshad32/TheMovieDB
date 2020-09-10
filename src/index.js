import React from 'react';
import Store from './redux/store';
import {Provider} from 'react-redux';
import PopularMovies from './screen/PopularMovies';

const App = () => {
  const store = Store();

  return (
    <Provider store={store}>
      <PopularMovies />
    </Provider>
  );
};

export default App;
