import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [term, setTerm] = useState("");
  const [pictures, setPictures] = useState([]);
  const [count, setCount] = useState(1);
  const [prevRefresh, setPrevRefresh] = useState(false);
  const changeHandler = e => {
    e.preventDefault();
    setTerm(e.target.value);
    console.log(term);
  };
  // ..........
  // after changing the component
  useEffect(() => {
    prevRefresh &&
      axios
        .get("https://api.unsplash.com/search/photos", {
          params: {
            query: term,
            page: count,
            per_page: 12
          },
          headers: {
            Authorization:
              "Client-ID 89a74f8c26da940b295f7c22ccaf83e3404ac033065c8db15fcbbc3b0639a400"
          }
        })
        .then(response => {
          setPictures([...response.data.results]);
          setPrevRefresh(false);
        })
        .catch(error => {
          console.log(error.message);
        });
  });

  // ..........
  // send first request
  const sendRequest = e => {
    e.preventDefault();
    axios
      .get("https://api.unsplash.com/search/photos", {
        params: {
          query: term,
          // page: count,
          per_page: 12
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

  // next prev page

  const nextPrevPage = e => {
    e.preventDefault();
    e.target.name === "increment"
      ? setCount(count + 1)
      : e.target.name === "decrement" && count > 1 && setCount(count - 1);
    setPrevRefresh(true);
    console.log("Page :", count);
  };

  return (
    <div className="container-fluid">
      <div className="row text-center text-white bg-dark">
        <div className="col-12 p-2 mt-3">
          <h1>Responsive Gallery App</h1>
        </div>
      </div>

      {/*  */}
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
              className="btn btn-info col-12"
            />
          </form>
        </div>
      </div>
      {/*  */}
      <div className="row text-center mb-2">
        <div className="col-6 mt-2">
          <button
            className="btn btn-info"
            name="decrement"
            onClick={nextPrevPage}
          >
            Prev Page
          </button>
        </div>
        <div className="col-6 mt-2">
          <button
            className="btn btn-info"
            name="increment"
            onClick={nextPrevPage}
          >
            Next Page
          </button>
        </div>
      </div>
      <div className="row d-flex flex-row flex-wrap justify-content-center m-auto">
        {pictures.length
          ? pictures.map(pic => (
              <div
                className="card "
                style={{
                  width: "330px",
                  height: "200px",
                  backgroundColor: "rgba(0, 0, 0, 0.9)"
                }}
              >
                <img
                  src={pic.urls.thumb}
                  alt={pic.id}
                  className="card-img-top"
                  height="120px"
                />
                <div style={{ opacity: "1" }} className="card-body text-white">
                  {pic.created_at}
                </div>
              </div>
            ))
          : null}
      </div>
      {/* <div className="row footer bg-info">
        <div className="col-12  p-4 text-white text-center">
          <p>Designed by Nooruldeen82</p>
        </div>
      </div> */}
    </div>
  );
}

export default App;
