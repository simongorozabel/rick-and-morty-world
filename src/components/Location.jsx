import PropTypes from "prop-types";
const Location = ({ location }) => {
  return (
    <section className="location__card">
      <p>
        <b>Name:</b>
        <br />
        <br />
        {location.name}
      </p>
      <p>
        <b>Type:</b>
        <br />
        <br />
        {location.type}
      </p>
      <p>
        <b>Dimension:</b>
        <br />
        <br />
        {location.dimension}
      </p>
      <p>
        <b>Population:</b>
        <br />
        <br />
        {location.residents.length}
      </p>
    </section>
  );
};

Location.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    dimension: PropTypes.string.isRequired,
    residents: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Location;
