import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterBar = ({isDark}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTags= searchParams.getAll("tags");
  const [tags, setTags] = useState(initialTags);

  const handleTags = (e) => {
    const { value } = e.target;
    let newTags = [...tags];

    if (newTags.includes(value)) {
      newTags = newTags.filter((el) => el !== value);
    } else {
      newTags.push(value);
    }

    setTags(newTags);
  };


  useEffect(()=>{
    let params={
      tags
    }
setSearchParams(params)
  },[tags])
  return (
    <div className='w-[150px]'>
      {/* Mapping through the tags and creating checkbox inputs */}
   <p  className={`bg-transparent text-xl font-semibold flex justify-center border-b pb-2 text-4xl font-extrabold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
   Filter By Tags 
   </p>
      {["mystery", "classic", "french", "love", "english", "american", "history", "fiction", "crime", "magical"].map(tag => (
        <div key={tag} className='flex align-center '>
          <input
            onChange={handleTags}
            type="checkbox"
            value={tag}
            checked={tags.includes(tag)}
      
        
          />
          <label      className={`ml-2 ${isDark ? 'text-white' : 'text-black'}`}>{tag}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
