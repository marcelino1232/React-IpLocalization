import React from 'react'

import Details from '../components/Details'
import Loading from '../components/Loading'
import useFetch from '../hooks/useFetch'

export default function Home() {

  const { state, fetchData } = useFetch();

  return (
    <>
      {state.message && <div className="alert alert-danger text-center border-0 rounded-0 fw-bold h4 py-3" role="alert">{state.message}</div>}
     
      <div className="container-sm my-4 ">
      <h1 className='text-center mb-4'>IP Localization</h1>
      <form onSubmit={fetchData} className="row justify-content-center">
          <div className="lookup">
            <input name='ipAddress' type="text" className="input" placeholder="Enter IP address" />
            <button type="submit" className="btn btn-dark btn">Look Up</button>
          </div>  
      </form>
      {state.loading && <Loading />}
      {!state.loading && state.response && <Details data={state.response} />}
    </div>
    </>
  
  )
}
