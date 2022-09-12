import { Helmet } from 'react-helmet-async';
import propTypes from 'prop-types';

export default function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title} | Instagram</title>
    </Helmet>
  );
}

PageTitle.propTypes = {
  title: propTypes.string.isRequired,
};
