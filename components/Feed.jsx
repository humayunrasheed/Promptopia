"use client";

import { useState, useEffect, useMemo } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = useMemo(() => {
    return (searchtext) => {
      const regex = new RegExp(searchtext, "i");
      return allPosts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );
    };
  }, [allPosts]);

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    debounceSearch(searchText);
  };

  const debounceSearch = useMemo(() => {
    let timeoutId;
    return (searchText) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const searchResult = filterPrompts(searchText);
        setSearchedResults(searchResult);
      }, 500);
    };
  }, [filterPrompts]);

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;