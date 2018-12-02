import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRepos } from '../../actions/getRepos';


const repoStatus = [
    { "title": "All", "name": "fork:true" },
    { "title": "Public", "name": "is:public" },
    { "title": "Private", "name": "is:private" },
    { "title": "Sources", "name": "fork:false" },
    { "title": "Forks", "name": "is:fork" },
    { "title": "Archived", "name": "archived:true" },
    { "title": "Mirrors", "name": "mirrors:true" }
]

class UserRepos extends Component {
    constructor() {
        super()
        this.state = {
            language: 'all',
            type: 'fork:true',
            searchTerm: '',
        }
    }

    componentDidMount() {
        const { searchTerm, type, language } = this.state;

        if (!this.props.repos.length) {
            this.props.getRepos(this.props.userName, { searchTerm, type, language });

        }
    }

    setBgColor = (color) => {
        const index = !color ? 'a' : color.toLowerCase();
        const colors = {
            css: '#563d7c',
            javascript: '#f1e05a',
            'c#': '#178600',
            html: '#d2d2d2'
        }

        if (colors.hasOwnProperty(index)) {
            return colors[index];
        }
        return 'red';
    }

    renderLoader = (item, index) => {

        return (
            <div key={index}>
                <div className="loader">
                </div>
                <div className="loader small">
                </div>

            </div>
        )

    }

    renderRepoItem = (item, index) => {
        return (
            <div key={index} className="repo-detail-container">
                <h4><a href={item.svn_url} className="repo-text">{item.name}</a></h4>
                <p className="repo-description">{item.description}</p>
                <div>
                    <span style={{ backgroundColor: this.setBgColor(item.language) }} className="language-bullets"></span>
                    <span className="repo-lang">{item.language}</span>
                    <span className="star-count"><span>&#x2605;</span>{item.stargazers_count}</span>
                    <span href="#" className="fork-counter">
                        <svg aria-label="fork" className="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
                        {item.forks_count}
                    </span>
                </div>
            </div>
        )
    }

    renderRepos = (list) => {
        const { isLoading, hasError } = this.props;
        if (hasError) {
            return (
                <div className="error-message">
                    <h3>
                        Sorry ! We couldn't get your repositories.
                    </h3>
                </div>
            )
        }
        if (isLoading) {
            return (
                <div>
                    {[1, 2, 3, 4, 5].map(this.renderLoader)}
                </div>
            )
        }
        return list.map(this.renderRepoItem);
    }

    getData = (query) => {
        this.setState(query);
        const { searchTerm, type, language } = this.state;
        const updateQuery = { searchTerm, type, language, ...query };
        this.props.getRepos(this.props.userName, updateQuery);
    }

    handleSearch = ev => {
        const searchTerm = ev.target.value.trim();
        this.getData({
            searchTerm
        });
    }

    handleType = ev => {
        const type = ev.target.value.trim();
        this.getData({
            type
        })
    }
    handleLang = ev => {
        const language = ev.target.value.trim();
        this.getData({
            language
        })
    }
    clearFilter = () => {
        this.getData({ searchTerm: '', type: 'fork:true', language: 'all' })
        this.setState({
            language: 'all',
            type: 'fork:true',
            searchTerm: '',
        })
    }
    render() {
        console.log(this.props);
        const { repos } = this.props;
        const repoNodes = this.renderRepos(repos);
        const { language, type, searchTerm } = this.state;
        const isFiltered = (type !== 'fork:true' && type !== 'all' || searchTerm.length > 0 || language !== 'all');

        return (
            <div>
                <div className="filter-wrapper">
                    <input type="text" onChange={this.handleSearch} placeholder="Find a repository..." className="searchterm-bar" />
                    <select name="" id="" onChange={this.handleType} className="search-by-type">

                        {repoStatus.map(({ name, title }, index) => {
                            return <option key={index} value={name} selected={type == name ? 'selected' : ''}>{title}</option>
                        })}
                    </select>
                    <select name="" id="" onChange={this.handleLang} className="search-by-lang">
                        <option value="all">All</option>
                        <option value="javascript">JavaScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="c#">C#</option>
                        <option value="python">Python</option>
                        <option value="typescript">TypeScript</option>
                        <option value="shell">Shell</option>
                    </select>
                    <button className="new-btn">New</button>
                </div>
                {
                    isFiltered &&
                    <div className="result-clear-wrapper">
                        <p className="search-result">{`${repos.length} results for ${type} repositories ${searchTerm.length ? `matching ${searchTerm}` : ''} ${language !== 'all' ? `written in ${language}` : ''}`}</p>
                        <p onClick={this.clearFilter}><button className="clear-btn">&#x274E;Clear Filter</button></p>
                    </div>
                }
                {
                    repoNodes
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRepos: (userName, query) => {
            dispatch(getRepos(userName, query));
        }
    }
};

const mapStateToProps = ({
    repos,
    userName
}) => {
    return ({
        ...repos,
        ...userName
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRepos);