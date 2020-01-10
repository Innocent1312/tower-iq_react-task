import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

import './App.scss';


const App = ({ usersList, isLoaded, page }) => {
  const indexOfLastItem = page * 5;
  const indexOfFirstItem = indexOfLastItem - 5;

  return (
    <div className="container">
      {isLoaded
        ? (
          <div className="jumbotron">
            <h1 className="display-6">TowerIQ Task !</h1>
            <p className="lead">Page: {page}</p>

            <table className="table table-hover app-table">
              <tbody>
              {usersList.users
                .slice(indexOfFirstItem, indexOfLastItem)
                .map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination totalAmountOfPages={usersList.users.length}/>
          </div>
        )
        : (
            <Loader/>
        )
      }
    </div>
  )
};

const mapStateToProps = state => ({
  usersList: state.usersList,
  isLoaded: state.isLoaded,
  page: state.page,
});

App.propTypes = {
  usersList: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
  }).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  {}
)(App);
