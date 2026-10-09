import React from 'react'
import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="container text-center my-5">
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-link d-inline-block">Go Back to Home</Link>
    </div>
  )
}
