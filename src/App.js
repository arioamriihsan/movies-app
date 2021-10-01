import React from 'react';
import { Route } from 'react-router-dom';
// Children
import { Header } from './components';
import { HomePage, DetailMovie } from './pages';
import { MovieProvider } from './components/MovieContext';
// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import 'font-awesome/css/font-awesome.min.css'; // Font Awesome

const App = () => {

  return (
    <MovieProvider>
      <Header />
      <Route path='/' component={HomePage} exact />
      <Route path='/detail/:id' component={DetailMovie} />
    </MovieProvider>
  );
};

export default App;
