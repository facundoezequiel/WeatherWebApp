import React from "react";
import GoogleMapReact from "google-map-react";

export default class GoogleMaps extends React.Component {
  render() {
    return (
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={13}
          bootstrapURLKeys={{
            key: "AIzaSyAuALk7UhI_Kdfe1FbGk-QnBCZEzeOy_1o",
          }}
        >
          <div lat={this.props.lat} lng={this.props.lng} text="" />
        </GoogleMapReact>
      </div>
    );
  }
}
