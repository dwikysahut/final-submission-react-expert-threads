/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export function NotFound({ redirectPage }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate(`/${redirectPage}`), 0);
  }, [navigate, redirectPage]);
}

NotFound.propTypes = {
  redirectPage: PropTypes.string.isRequired,
};
