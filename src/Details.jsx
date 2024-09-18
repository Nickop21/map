import React from "react";

function Details({ selectedProperty }) {
  return (
    <div className="details">
      {selectedProperty.status === "active" ? (
        <span className="avaliablity green">available</span>
      ) : (
        <span className="avaliablity red">unavailable</span>
      )}

      <div className="pricings">
        <p className="location">
          {selectedProperty.division_slugs.village},{" "}
          {selectedProperty.division_slugs.district},{" "}
          {selectedProperty.division_slugs.state}
        </p>

        <div>
          Size :{" "}
          <span> {selectedProperty.total_land_size_in_acres.acres} acres</span>
          {selectedProperty.total_land_size_in_acres.guntas > 0 && (
            <span>
              {" "}
              {selectedProperty.total_land_size_in_acres.guntas} Guntas
            </span>
          )}
        </div>

        <div>
          Price per Acre : ₹
          {selectedProperty.price_per_acre_crore.crore > 0 && (
            <span> {selectedProperty.price_per_acre_crore.crore} crore </span>
          )}
          <span>{selectedProperty.price_per_acre_crore.lakh} lakhs</span>
        </div>

      </div>
      <span className="agent ">{selectedProperty.seller_type}</span>
    </div>
  );
}

export default Details;

