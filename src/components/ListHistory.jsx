import React from 'react'
import { Link } from 'react-router'

export default function ListHistory({state, locations, removeLocation, searchByIP }) {
  return (
    <div className="table-responsive my-4">
       <div className={`d-flex flex-column flex-sm-row ${state.data.length != 0 ? 'justify-content-between' : 'justify-content-center'} align-items-center mb-3 py-1`}>
         <h3 className='mb-4 mb-sm-0'>List Of History</h3>
         {state.data.length != 0 && (
           <form onSubmit={searchByIP} className="d-flex flex-column flex-sm-row d-grid search gap-2">
              <input name='search' type="text" className="form-control py-2 py-sm-0 me-2  my-sm-0" placeholder="Search..." />
              <button type="submit" className="btn btn-dark py-2">Search</button>    
           </form>
         )}
       </div>
        <table className="table table-bordered text-center">
            <thead>
            <tr className="d-none d-md-table-row">
                <th scope="col">#</th>
                <th scope="col">IP</th>
                <th scope="col">City</th>
                <th scope="col">Region</th>
                <th scope="col">Postal</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {locations.length === 0 && state.search == "" && (
                <tr>
                    <td colSpan="6" className="text-center  fw-bold h4">No history available.</td>
                </tr>
            )}
            {locations.length === 0 && state.search != "" && (
                <tr>
                    <td colSpan="6" className="text-center  fw-bold h4">Sorry, no history found for the given search.</td>
                </tr>
            )}
            {locations.map((location, index) => (
                <tr key={index} className="d-flex d-md-table-row flex-column flex-md-row align-items-center align-items-md-start movil">
                <th className="w-md-100" scope="row">{index + 1}</th>
                <td className="w-md-100">{location.ip}</td>
                <td className="w-md-100">{location.city}</td>
                <td className="w-md-100">{location.region_code}</td>
                <td className="w-md-100">{location.postal}</td>
                <td className="w-md-100 d-flex gap-2 justify-content-center">
                    <Link to={`/history/${location.ip}`} className="btn btn-primary btn-sm w-35">View</Link>
                    <button onClick={() => removeLocation(location.ip)} className="btn btn-danger btn-sm w-35">Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}
