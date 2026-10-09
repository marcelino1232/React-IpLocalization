import React,{useEffect} from 'react';
import { useNavigate } from 'react-router';

const key = 'locations';

const initialState = {
  data: null,
  response: null,
  loading: false,
  search: '',
  view: null,
  totalRows: null,
  totalPages: null,
  currentPage: 1,
  pageSize: 4,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_DATA':
      const skip = (state.currentPage - 1) * state.pageSize;
      const take = state.pageSize;

      let baseData = action.payload;

      let paginatedData = [];

      if(state.search.trim() !== '') 
      {
        baseData = baseData.filter((loc) => loc.ip.includes(state.search));
        paginatedData = baseData.slice(skip, skip + take);
      }else{
        paginatedData = baseData.slice(skip, skip + take);
      }

      return { 
        ...state, 
        data: action.payload, 
        loading: false ,
        view: paginatedData,
        totalRows: baseData.length,
        totalPages: Math.ceil(baseData.length / state.pageSize),
      };
    case 'INCREMENT_PAGE':
      return { ...state, currentPage: state.currentPage + 1 };
    case 'DECREMENT_PAGE':
      return { ...state, currentPage: state.currentPage - 1 };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_RESPONSE':
      return { ...state, response: action.payload, loading: false };
    default:
      return state;
  }
};

export default function useLocalStore() {

  const navigate = useNavigate();

  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    getAllLocations();
  }, [state.search,state.currentPage]);

  const getLocations = () => {
    const locations = localStorage.getItem(key);
    return locations ? JSON.parse(locations) : [];
  };

  const getAllLocations = () => {
     dispatch({ type: 'SET_LOADING' });
     dispatch({ type: 'SET_DATA', payload: getLocations() });
  };

  const existsInLocalStorage = (ip) => {
    const locations = getLocations();
    return locations.some((loc) => loc.ip === ip);
  }

  const getByIndex = (ip) => {
    dispatch({ type: 'SET_LOADING' });

    const locations = getLocations();

    const location = locations.find((loc) => loc.ip === ip);

    if(location == undefined) {
      navigate('/notfound');
    } else {
      dispatch({ type: 'SET_RESPONSE', payload: location });
    }
  };

  const addLocation = (location) => {
    const locations = getLocations();
    locations.push(location);
    dispatch({ type: 'SET_DATA', payload: locations });
    localStorage.setItem(key, JSON.stringify(locations));
  };

  const removeLocation = (ip) => {
    if (!window.confirm('Are you sure you want to delete this location?')) {
      return;
    }
    const locations = getLocations();
    const updatedLocations = locations.filter((loc) => loc.ip !== ip);
    dispatch({ type: 'SET_DATA', payload: updatedLocations });
    localStorage.setItem(key, JSON.stringify(updatedLocations));
  };

  const incrementPage = () => {
    if (state.currentPage < state.totalPages) {
      dispatch({ type: 'INCREMENT_PAGE'});
    }
  }

  const decrementPage = () => {
    if (state.currentPage > 1) {
      dispatch({ type: 'DECREMENT_PAGE'});
    }
  }

  const searchByIP = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    dispatch({ type: 'SET_SEARCH', payload: form.get('search') });
  }

  return { state, incrementPage, decrementPage, searchByIP, existsInLocalStorage, getAllLocations, getByIndex, addLocation, removeLocation };
}
