import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom"

function MyFooter(props) {

  const footer = (
    <>
      <footer className="footer mt-auto py-3">
        <div className="container">
          <span className="text-muted">Place sticky footer content here.</span>
        </div>
      </footer>
    </>
  )
  
  const path = props.history.location.pathname;
  let displayFooter;

  if(path === "/login" || path === "/welcome" ||
  path === '/') displayFooter = "";
  else displayFooter = footer

  return (
    <>
     {displayFooter}
    </>
  )
}

export default withRouter(MyFooter)
