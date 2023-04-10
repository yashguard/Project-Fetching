import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [num, setNum] = useState(1);
  let [api, setApi] = useState([]);
  const setNext = () => {
    setNum(num === 10 ? 10 : ++num);
  };
  const setPrev = () => {
    setNum(num === 1 ? 1 : --num);
  };
  useEffect(() => {
    apiArray();
  }, [num]);
  let apiArray = async () => {
    let req = await fetch(
      `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?limit=10&page=${num}`
    );
    let res = await req.json();
    setApi(res.data);
  };
  console.log(api);
  return (
    <div className="section">
      {api.map((v, i) => {
        return (
          <div className="main-box" key={i}>
            <div className="box">
              <span>Id : {v.id}</span>
              <img src={v.image} />
              <h1>Name : {v.name}</h1>
              <h2>NumberOfVotes : {v.number_of_votes}</h2>
              <span>TotalPrice : {v.price_starts_from}</span>
              <h4>Ratings : {v.rating}</h4>
              <h3>Type : {v.type}</h3>
            </div>
          </div>
        );
      })}
      <button onClick={() => setPrev()}>Prev</button>
      <button onClick={() => setNext()}>Next</button>
    </div>
  );
}

export default App;
