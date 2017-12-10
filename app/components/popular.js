import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos, battle} from '../utils/api';

class SelectLanguage extends React.Component {

    render(){
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
        const { selectedLanguage, onSelect } = this.props;

        return(
            <ul className='languages'>
                {languages.map((lang) => {
                    return (
                        <li
                            style={lang === selectedLanguage ? {color: '#d0021b'} : null}
                            onClick={() => onSelect(lang) }
                            key={lang}>
                            {lang}
                        </li>
                    )
                }, this)}
            </ul>
        )
    }
}

function RepoGrid ({ repos }) {
    return (
        <ul className='popular-list'>
            {repos.map(({name, owner, html_url, stargazers_count}, index) => {
                return (
                    <li key={name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={owner.avatar_url}
                                    alt={'Avatar for ' + owner.login}
                                />
                            </li>
                            <li><a href={html_url}>{name}</a></li>
                            <li>@{owner.login}</li>
                            <li>{stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: null
    };

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage = async (lang) => {
        this.setState(() => {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        const repos = await fetchPopularRepos(lang);
        this.setState(() => {
            return {
                repos: repos
            };
        })
    };

    render() {

        const { selectedLanguage, repos } = this.state;

        return (
            <div>
                <SelectLanguage selectedLanguage={selectedLanguage} onSelect={this.updateLanguage} />

                {!this.state.repos
                    ? <p>LOADING!</p>
                    : <RepoGrid repos={repos} />}
            </div>
        )
    }
}

export default Popular;