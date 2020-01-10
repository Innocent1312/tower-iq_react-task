import React from 'react';
import PropTypes from 'prop-types';
import { setPage } from '../../redux/store';
import { connect } from "react-redux";
import './Pagination.scss'

const Pagination = ({ page, totalAmountOfPages, setPage }) => {
  const numberOfPages = [];

  for (let i = 1; i <= Math.ceil(totalAmountOfPages / 5); i += 1) {
    numberOfPages.push(i);
  }

  const setPrevButtonToDisabled = (pageNumber) => {
    let pageClass;
    pageNumber <= 1
      ? pageClass = 'button-disabled'
      : pageClass = '';

    return pageClass;
  };

  const setNextButtonToDisabled = (pageNumber) => {
    let pageClass;
    pageNumber === numberOfPages.length
      ? pageClass = 'button-disabled'
      : pageClass = '';

    return pageClass;
  };

  return (
    <>
      <ul className="button-list">
        <li className={setPrevButtonToDisabled(page)}>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        </li>

        {numberOfPages.map(number => (
          <li key={number}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          </li>
        ))}

        <li className={setNextButtonToDisabled(page)}>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalAmountOfPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  page: state.page,
});

export default connect(
  mapStateToProps,
  { setPage }
)(Pagination);