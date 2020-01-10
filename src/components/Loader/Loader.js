import React from 'react';
import { connect } from 'react-redux';
import { loadUsers } from '../../redux/store';

const Loader = ({ isLoading, isError, loadUsers }) => (
  <>
    {isError ? 'Something went wrong' : ''}

    <button
      type="button"
      className="btn btn-success btn-lg align-middle loader-button"
      onClick={async () => {
        await loadUsers()
      }}
    >
      {isLoading ? 'Loading...' : 'Load'}
    </button>
  </>
);

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  isError: state.isError,
});

export default connect(
  mapStateToProps,
  { loadUsers }
)(Loader);