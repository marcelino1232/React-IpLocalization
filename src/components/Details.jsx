import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Details({data}) {
  const position = [data.latitude, data.longitude];
  return (
    <div className="mt-4 mb-3">
        <h2 className="text-center my-5">Location Details</h2>
        <div className="row g-3">
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-header text-center">
                       <p className="h5 mb-0 py-2"> IP Address : {data?.ip}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">City: {data?.city}</li>
                        <li className="list-group-item">Region: {data?.region}</li>
                        <li className="list-group-item">Country: {data?.country}</li>
                        <li className="list-group-item">Postal Code: {data?.postal}</li>
                        <li className="list-group-item">Timezone: {data?.timezone}</li>
                    </ul>
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-header text-center">
                        <p className="h5 mb-0 py-2"> Location</p>
                    </div>
                    <div className="card-body">
                        <MapContainer className='map-size' center={position} zoom={14} scrollWheelZoom={false} >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    {`${data?.city},${data?.region_code},${data?.postal}`}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}