import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [term, setTerm] = useState("");
  const [pictures, setPictures] = useState([]);
  const [count, setCount] = useState(1);
  const changeHandler = e => {
    setTerm(e.target.value);
    console.log(term);
  };

  const sendRequest = e => {
    e.preventDefault();
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: {
          query: term,
          page: count,
          per_page: 9
        },
        headers: {
          Authorization:
            "Client-ID 89a74f8c26da940b295f7c22ccaf83e3404ac033065c8db15fcbbc3b0639a400"
        }
      })
      .then(response => {
        setPictures([...response.data.results]);
      })
      .catch(error => {
        console.log(error.message);
      });
    console.log(count);
  };
  const increment = () => {
    setCount(count + 1);
    console.log("clicked");
  };
  // const decrement = () => {
  //   setCount(count - 1);
  //   console.log("clicked");
  // };
  return (
    <div className="container-fluid">
      <div className="row text-center text-white bg-dark">
        <div className="col-12 p-2 mt-3">
          <h1>Welcome to the Gallery App</h1>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-12 mt-2">
          <button className="btn btn-primary" onClick={increment}>
            Next Page
          </button>
          <h3>
            <span className="badge text-white bg-warning">Page :{count}</span>
          </h3>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-sm-12 col-md-8 col-lg-6">
          <form onSubmit={sendRequest} className="form-group">
            <input
              type="text"
              onChange={changeHandler}
              className="form-control col-12 mb-3"
              placeholder="Type here, what kind of images you are searching for"
            />
            <input
              type="submit"
              value="Search"
              className="btn btn-primary col-12"
            />
          </form>
        </div>
      </div>
      <div className="row d-flex flex-row flex-wrap justify-content-center m-auto">
        {pictures.length
          ? pictures.map(pic => (
              <img
                src={pic.urls.thumb}
                alt={pic.id}
                width="370px"
                height="200px"
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
