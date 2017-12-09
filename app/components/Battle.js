import React from 'react';
import PropTypes from 'prop-types';
import { Link }  from 'react-router-dom';

function PlayerPreview (props) {
    return (
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={'Avatar for ' + props.username}
                />
                <h2 className='username'>@{props.username}</h2>
            </div>
            <button
                className='reset'
                onClick={props.onReset.bind(null, props.id)}>
                Reset
            </button>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};


class PlayerInput extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    static defaultProps = {
        label: 'Username'
    };

    state = {
        username: ''
    };

    /*
        Event values should never be set directly as events are long
        gone by the time setState runs. So wrto events values must be
        stored before setting them in a state.
     */
    handleChange = (event) => {
        const value = event.target.value;
        this.setState(() => ({ username: value }))
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    };
    render() {
        const { label } = this.props;
        const { username } = this.state;

        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>{label}</label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    value={username}
                    autoComplete='off'
                    onChange={this.handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!username}>
                    Submit
                </button>
            </form>
        )
    }
}

class Battle extends React.Component {
    state = {
        playerOneName: '',
        playerTwoName: '',
        playerOneImage: null,
        playerTwoImage: null,
    };

    handleSubmit = (id, username) => {
        this.setState(() => ({
            [id + 'Name']: username,
            [id + 'Image']: `https://github.com/${username}.png?size=200`
        }));
    };

    handleReset = (id) => {
        this.setState(() => ({
            [id + 'Name']: '',
            [id + 'Image']: null
        }));
    };

    render() {
        var { match } = this.props;
        const { playerOneName, playerOneImage, playerTwoName, playerTwoImage } = this.state;

        return (
            <div>
                <div className='row'>
                    {!playerOneName &&
                    <PlayerInput
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit}
                    />}

                    {playerOneImage !== null &&
                    <PlayerPreview
                        avatar={playerOneImage}
                        username={playerOneName}
                        onReset={this.handleReset}
                        id='playerOne'
                    />}

                    {!playerTwoName &&
                    <PlayerInput
                        id='playerTwo'
                        label='Player Two'
                        onSubmit={this.handleSubmit}
                    />}

                    {playerTwoImage !== null &&
                    <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}
                        onReset={this.handleReset}
                        id='playerTwo'
                    />}
                </div>

                {playerOneImage && playerTwoImage &&
                <Link
                    className='button'
                    to={{
                        pathname: match.url + '/results',
                        search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                    }}>
                    Battle
                </Link>}
            </div>
        )
    }
}

export default Battle;