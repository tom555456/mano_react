import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from 'leaflet'
import { Icon } from "leaflet";
import * as matchaData from "../../../src/data/MatchaBrown.json";
import * as matchaDataDark from "../../../src/data/MatchaDark.json";
import * as matchaDataLight from "../../../src/data/MatchaLight.json";
import * as matchaDataAll from "../../../src/data/MatchaAll.json";
import "./MapPage.css";
import { Container, Button, Nav, Navbar, Card, Image, Row, Col, Form } from 'react-bootstrap'
import SearchBar from '../courses/SearchBar'


const MatchaBrown = "#c5895a"
const MatchaDark = "#5c6447"
const MatchaLight = "#8c9a6a"

const markerBrown = `
  background-color: ${MatchaBrown};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  top: 1.5rem;
  position: relative;
  border-radius: 3rem 4rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const markerDark = `
  background-color: ${MatchaDark};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  top: 1.5rem;
  position: relative;
  border-radius: 3rem 4rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const markerLight = `
  background-color: ${MatchaLight};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  top: 1.5rem;
  position: relative;
  border-radius: 3rem 4rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

export const iconBrown = Leaflet.divIcon({
  className: "my-custom-pin",
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  html: `<span style="${markerBrown}" />`
})

export const iconDark = Leaflet.divIcon({
  className: "my-custom-pin",
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  html: `<span style="${markerDark}" />`
})

export const iconLight = Leaflet.divIcon({
  className: "my-custom-pin",
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  html: `<span style="${markerLight}" />`
})



export default function MapPage() {
  const [activePark, setActivePark] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('All');

  function handleChange(event) {
    setSearchValue(event.target.value);
  };
  console.log(searchValue)

  const recommend = (

    matchaData.features.map(park => (

      <Marker
        color={park.properties.markerColor}
        key={park.properties.PARK_ID}
        position={[
          park.geometry.coordinates[1],
          park.geometry.coordinates[0]
        ]}
        onClick={() => {
          setActivePark(park);
        }}
        icon={iconBrown}
      />
    ))

  )

  const matcha = (

    matchaDataDark.features.map(park => (

      <Marker
        color={park.properties.markerColor}
        key={park.properties.PARK_ID}
        position={[
          park.geometry.coordinates[1],
          park.geometry.coordinates[0]
        ]}
        onClick={() => {
          setActivePark(park);
        }}
        icon={iconDark}
      />
    ))

  )

  const group = (

    matchaDataLight.features.map(park => (

      <Marker
        color={park.properties.markerColor}
        key={park.properties.PARK_ID}
        position={[
          park.geometry.coordinates[1],
          park.geometry.coordinates[0]
        ]}
        onClick={() => {
          setActivePark(park);
        }}
        icon={iconLight}
      />
    ))

  )




  let display

  switch (searchValue) {
    case 'Mano推薦':
      display = recommend
      break;
    case '抹茶專門店':
      display = matcha
      break;
    case '適合小型聚會':
      display = group
      break;

    default:
      display = matcha + recommend + group
  }




  return (
    <>
      <Container style={{ paddingTop: "2%", marginBottom: "5%" }}>
        <Form onChange={handleChange}>
          {['radio'].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check
                type={type}
                value="All"
              />
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={`default ${type}`}
                value="抹茶專門店"
              />
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={`default ${type}`}
                value="Mano推薦"
              />
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={`default ${type}`}
                value="適合小型聚會"
              />
            </div>
          ))}
        </Form>
        <Map center={[25.033574, 121.543846]} zoom={15}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />



          {display}






          {activePark && (
            <Popup
              position={[
                activePark.geometry.coordinates[1],
                activePark.geometry.coordinates[0]
              ]}
              onClose={() => {
                setActivePark(null);
              }}
            >
              <div style={{ width: "100%" }}>
                <h6>{activePark.properties.NAME}</h6>
                <div style={{ width: "200px", height: "120px" }}>
                  <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={activePark.properties.PICTURE_LI}></img>
                </div>
                <p>{activePark.properties.ADDRESS}</p>
                <p>{activePark.properties.PHONE}</p>
                <a href={activePark.properties.WEBSITE}>{activePark.properties.WEBSITE}</a>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: "1rem" }} className="facility">{activePark.properties.FACILITY}</p>
                  <p style={{ marginRight: "1rem" }} className="facility">{activePark.properties.FACILITY_F}</p>
                  <p className="facility">{activePark.properties.DESCRIPTIO}</p>
                </div>
              </div>
            </Popup>
          )}
        </Map>


        <div>
          <h4 >Information</h4>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {matchaData.features.map(park => (
              <a href={park.properties.WEBSITE} style={{ width: "70vw", height: "90%" }}>
                <Card style={{ marginRight: "10px" }}>
                  <div className="cardText">
                    <Card.Text style={{ fontSize: ".8rem" }}>{park.properties.NAME}</Card.Text>
                    <p style={{ fontSize: ".8rem", color: "#5c6447" }}>{park.properties.FACILITY}</p>
                  </div>
                  <Image style={{ objectFit: "cover" }} className="infoImg" src={park.properties.PICTURE_LI} />
                </Card>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}