import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import CourseDetails from './components/CourseDetails/CourseDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Reviews from './components/Reviews/Reviews';
import formRev from './components/Reviews/Form/Form'
import Review from './components/Reviews/Review/Review';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/courses" />} />
          <Route path="/courses" exact component={Home} />
          <Route path="/reviews" exact component={Reviews} />
          <Route path="/review" exact component={Review} />
          <Route path="/courses/search" exact component={Home} />
          <Route path="/courses/:id" exact component={CourseDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/courses" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
