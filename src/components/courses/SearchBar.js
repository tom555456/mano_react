import React, { Component } from 'react'

function SearchBar(props) {
  return (
    <>
      <div>
        <input
          type="text"
          value={props.searchValue}
          className="searchBar"
          onChange={props.onChange}
        />
      </div>
    </>
  )
}

export default SearchBar
