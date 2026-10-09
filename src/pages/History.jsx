import useLocalStore from '../hooks/useLocalStore';
import Loading from '../components/Loading';
import ListHistory from '../components/ListHistory';

export default function History() {

  const { state,searchByIP, incrementPage, decrementPage, removeLocation } = useLocalStore();

  return (
    <div className="container-md">
      {state.loading && (
        <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}>
          <Loading />
        </div>
      )}
      {!state.loading && state.view && <ListHistory state={state} locations={state.view}  removeLocation={removeLocation} searchByIP={searchByIP} />} 
      {state.totalPages > 1 && (
        <div className="d-flex flex-column flex-sm-row justify-content-center my-4">
          <button onClick={decrementPage} disabled={state.currentPage === 1} className="btn btn-dark me-2 pagination-size">Previous</button>
          <span className="align-self-center my-2 my-sm-0">Page {state.currentPage} of {state.totalPages}</span>
          <button onClick={incrementPage} disabled={state.currentPage === state.totalPages} className="btn btn-dark ms-0 ms-sm-2 pagination-size">Next</button>
        </div>
      )}
    </div>
  )
}