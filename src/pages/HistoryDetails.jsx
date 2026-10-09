import React from 'react'
import { useParams, Link } from 'react-router';
import { useEffect } from 'react';

import useLocalStore from '../hooks/useLocalStore';
import Details from '../components/Details';
import Loading from '../components/Loading';

export default function HistoryDetails() {

  const params = useParams();

  const { state, getByIndex } = useLocalStore();

  useEffect(() => {
    getByIndex(params.ip);
  }, []);

  return (
    <div className=" container">
      {state.loading && <Loading />}
      {!state.loading && state.response && <Details data={state.response} />}
      <div className="d-flex justify-content-end mb-4">
        <Link to="/history" className="btn btn-dark">Back</Link>
      </div>
    </div>
  )
}
