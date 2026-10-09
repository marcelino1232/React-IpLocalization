import React from 'react'
import { Link } from 'react-router'

export default function Error({ message }) {
  return (
    <div>
      <h1>Internal Server Error</h1>
      <p>An error occurred while processing your request.</p>
      {message && <p className="text-danger">Details: {message}</p>}
      <Link to="/" className="btn btn-primary">Go Back to Home</Link>
    </div>
  )
}
