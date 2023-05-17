import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { getResidentByLink } from "../services/getResidentByLink";
import Loader from "./Loader";
const ResidentCard = ({ link }) => {
  let emojiStatus = "";
  let colorStatus = "";

  const [resident, setResident] = useState(null);

  useEffect(() => {
    const loadResident = async () => {
      const residentInfo = await getResidentByLink(link);
      setResident(residentInfo);
      console.log(residentInfo);
    };
    loadResident();
  }, []);

  if (resident) {
    if (resident.status === "Dead") {
      emojiStatus = "💀";
      colorStatus = "lightcoral";
    } else if (resident.status === "Alive") {
      emojiStatus = "💚";
      colorStatus = "greenyellow";
    } else {
      emojiStatus = "🙄";
      colorStatus = "aliceblue";
    }
  }

  return (
    <>
      {resident ? (
        <section className="resident__card">
          <div>
            <p style={{ boxShadow: `1px 1px 8px 2px ${colorStatus}` }}>
              {emojiStatus + resident.status}
            </p>
            <img src={resident.image} alt={resident.name} />
          </div>
          <h3 style={{ color: `${colorStatus}` }}>{resident.name}</h3>
          <ul>
            <li>
              <b>Specie:</b>
              <br />
              <p>{resident.species}</p>
            </li>
            <li>
              <b>Origin:</b>
              <br />
              <p>{resident.origin.name}</p>
            </li>
            <li>
              <b>Episodes:</b>
              <br />
              <p>
                {resident.episode.map((ep) => (
                  <span key={ep}>{ep.split("/").slice(-1).toString()} </span>
                ))}
              </p>
            </li>
          </ul>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

ResidentCard.propTypes = {
  link: PropTypes.shape({
    status: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    origin: PropTypes.objectOf(PropTypes.string).isRequired,
    episode: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ResidentCard;
