import React, { Component } from 'react'
import Overview from './overview'
import Repository from './userRepos'
import Stars from './stars'
import Followers from './followers'
import Following from './following'
import { connect } from 'react-redux';

class UserDataContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classProperty: 2
        }
    }

    handleClick(val) {
        this.setState({ classProperty: val })
    }
    render() {
        const { profile } = this.props;
        const { public_repos, followers, following } = profile;
        const startCount = 5;
        return (
            <div className="user-info-bg">
                <div className="tabs-container">
                    <div className="content-tab-container">
                        <span className={`content-tabs ${this.state.classProperty === 1 ? "tab-active" : ''}`} onClick={this.handleClick.bind(this, 1)}>Overview </span>
                        <span className={`content-tabs ${this.state.classProperty === 2 ? "tab-active" : ''}`} onClick={this.handleClick.bind(this, 2)}>Repositories {public_repos > 0 ? <span className="tabs-total-count">{public_repos}</span> : ''}</span>
                        <span className={`content-tabs ${this.state.classProperty === 3 ? "tab-active" : ''}`} onClick={this.handleClick.bind(this, 3)}>Stars {startCount > 0 ? <span className="tabs-total-count">{startCount}</span> : ''}</span>
                        <span className={`content-tabs ${this.state.classProperty === 4 ? "tab-active" : ''}`} onClick={this.handleClick.bind(this, 4)}>Followers {followers > 0 ? <span className="tabs-total-count">{followers}</span> : ''}</span>
                        <span className={`content-tabs ${this.state.classProperty === 5 ? "tab-active" : ''}`} onClick={this.handleClick.bind(this, 5)}>Following {following > 0 ? <span className="tabs-total-count">{following}</span> : ''}</span>
                    </div>
                </div>
                {
                    this.state.classProperty === 1 ?
                        <Overview /> : this.state.classProperty === 2 ?
                            <Repository /> : this.state.classProperty === 3 ?
                                <Stars /> : this.state.classProperty === 4 ?
                                    <Following /> : this.state.classProperty === 5 ?
                                        <Followers /> : null
                }
            </div>
        )
    }
}



const mapStateToProps = ({
    profile
}) => {
    return ({
        profile
    })
}

export default connect(mapStateToProps)(UserDataContainer);