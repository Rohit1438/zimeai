"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SunIcon, MoonIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { Table } from 'antd';
import { useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [limit, setLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTags= searchParams.getAll("tags");
const [search,setSearch]=useState("")
  const fetchPosts = async () => {
    console.log("fething");
    try {
      if(search.length!==0){
        const { data } = await axios.get(`https://dummyjson.com/posts/search?q=${search}`);
console.log("search running");
        setPosts(data.posts);
      }else if(initialTags.length!==0){
        const { data } = await axios.get(`https://dummyjson.com/posts`);

       


       let filteredUsers = data.posts.filter(post => 
        initialTags.every(el => post.tags.includes(el))
      );

      setPosts(filteredUsers)
      }else if(initialTags.length==0 || search.length==0){
        const { data } = await axios.get(`https://dummyjson.com/posts?skip=${(page - 1) * limit}&limit=${150}`);
        setPosts(data.posts);
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
console.log(search);
  }, [page,searchParams,search]);
console.log("render ");
  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => (
        <>
          {tags.map(tag => (
            <span key={tag} className="tag bg-teal-200 mx-2 px-2 rounded-md">{tag}</span>
          ))}
        </>
      ),
    },
  ];

  return (
    <main className={`mx-auto px-4 py-8 ${isDark ? 'bg-gradient-to-br from-slate-900 to-purple-900 ' : 'bg-white text-black'}`}>
      <h1 className={`bg-transparent flex justify-center text-4xl font-extrabold mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
        Demo Post Showing App
      </h1>

      <div className="flex justify-center mt-8 mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {/* <input
          onChange={(e) => setLimit(Number(e.target.value))}
          placeholder="user limit"
          value={limit}
          type="number"
          className="mx-4 p-2 border-2 w-[100px] flex justify-center rounded-md border-gray-400"
        /> */}
                <button
          className="text-blue-500 border  border-sky-500 bg-white  font-bold py-2 px-4 ml-4 rounded"
        
        >
          {page}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <button className="absolute top-4 right-4" onClick={() => setIsDark(prev => !prev)}>
        {!isDark ? <SunIcon className="text-yellow-500 w-12 animate-spin" /> : <MoonIcon className="animate-float text-gray-300 w-12" />}
      </button>


<div className=" flex justify-center">
<input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search by keywords"
          value={search}
          type="text"
          className="mx-4 mb-4 p-2 border-2 w-[300px]  flex justify-center  rounded-md border-gray-400"
        />
</div>
{posts.length!==0?      <div className="grid grid-flow-col gap-10 grid-2 z-20">
        <FilterBar className="mr-8 px-2" isDark={isDark}/>
        <Table className="flex justify-center" dataSource={posts} columns={columns} rowKey="id" />
      </div>: <div className="flex  z-20">
        <FilterBar className="mr-8 px-2" isDark={isDark}/>
        <div className="w-[100%] flex justify-center align-middle text-center">
<p  className={`bg-transparent text-2xl flex m-auto flex justify-center   mb-8 ${isDark ? 'text-white' : 'text-black'}`}>
        Sorry.. no posts found
      </p>
</div>
      </div>




      }

      {selectedPost && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 cardpop">
          <div className="max-w-3xl w-full bg-white rounded-md overflow-hidden shadow-lg flex flex-col md:flex-row p-8 relative">
            <div className="md:w-1/2">
              <div className="font-bold text-xl mb-2">{`${selectedPost.title}`}</div>
              <p className="text-gray-800 font-semibold text-base">{selectedPost.body}</p>
            </div>
            <div className="md:w-1/2 px-6 py-4">
              <button
                className="bg-white-500 hover:bg-red-200 text-white font-bold py-2 px-4 mt-4 rounded absolute right-5 top-0"
                onClick={handleCloseDetail}
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
