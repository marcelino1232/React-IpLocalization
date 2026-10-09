import React , {useReducer} from 'react'
import { useNavigate } from 'react-router';
import useLocalStore from './useLocalStore';

const initialState = {
  response: null,
  loading: false,
  message: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, message: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, message: null, response: action.payload };
    case 'VALIDATION_ERROR':
      return { ...state, loading: false, message: action.payload };
    default:
      return state;
  }
};

export default function useFetch() {

  const navigate = useNavigate();

  const ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;

  const [state, dispatch] = useReducer(reducer, initialState);

  const { existsInLocalStorage, addLocation } = useLocalStore();

  const fetchData = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const ip = form.get('ipAddress');

    try {

      if(!ip || ip.trim() === '') {
      dispatch({ type: 'VALIDATION_ERROR', payload: 'IP address is required.' });
      return;
      }

      if(!ipRegex.test(ip)) {
        dispatch({ type: 'VALIDATION_ERROR', payload: 'Invalid IP address format.' });
        return;
      }

      dispatch({ type: 'FETCH_START' });

      const response = await fetch(`https://ipapi.co/${ip}/json/`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();

      if (data.error) {
        dispatch({ type: 'VALIDATION_ERROR', payload: data.reason });
        return;
      }
      
      if(!existsInLocalStorage(ip)) {
        addLocation(data);
      }
      
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      navigate(`/error/${error.message}`); // Navigate to the error page
    }finally {
      e.target.reset(); // Reset the form after submission

      const timeoutId = setTimeout(() => {
        dispatch({ type: 'VALIDATION_ERROR', payload: null });
      }, 1200);

      return () => clearTimeout(timeoutId);
    }
  }

  return { state, fetchData }; 
} 
