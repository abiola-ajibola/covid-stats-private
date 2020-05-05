import React from 'react';
import "./index.css";

const Searchbar = ({onChange}) => {
    
    return (
        <input className='input' type='search' placeholder="Search Countries" onChange={onChange}></input>
    )
}

export default Searchbar;
