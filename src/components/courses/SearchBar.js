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
          style={{
            width: '100%',
            height: '30px',
            background: '#EFF3EC',
            border: '3px solid #CFDDCD',
          }}
        />
        <i
          class="fas fa-search"
          style={{ position: 'relative', top: '-24px', left: '133px' }}
        ></i>
      </div>
    </>
  )
}

export default SearchBar
