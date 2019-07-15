import React, { useState } from 'react';

export default function Searchbar(props) {
  const [term, setTerm] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    props.onSubmit(term);
  };

  return (
    <form id="search-images" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search any image..."
        onChange={e => setTerm(e.target.value)}
        value={term}
        className="form-control mt-4"
      />
    </form>
  );
}
