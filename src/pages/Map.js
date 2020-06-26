import React from "react";
import MapPage from "../components/Map/MapPage";

function Map() {
    const loading = (
      <>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    )
    
    const mapShow = (
        <>
        <div className="d-flex align-items-start product-list">
          <div>
            <MapPage />
          </div>
        </div>
        </>
    )
  
    return (
      <>
        <div className="container">{mapShow}</div>
      </>
    )
  }
  
  export default Map
  