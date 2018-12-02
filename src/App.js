import React, { Component } from 'react';
import UserBio from './component/userBio/userBio'
import Header from './component/header/header'
import UserDataContainer from './component/userRepos/userDataContainer'


class App extends Component {


  render() {
    return (
      <div>
        <Header/>
        <div className="app-bg">
        <UserBio/>
        <UserDataContainer/>
        </div>
      </div>
    );
  }
}


export default App
