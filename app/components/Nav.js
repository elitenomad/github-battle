var React = require('react');
var NavLink = require('react-router-dom').NavLink;

/*
    As the component returns only DOM, we can just use function
    to represent a component
*/
function Nav () {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/battle'>Battle</NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/popular'>Popular</NavLink>
            </li>
        </ul>
    )
}

module.exports = Nav;