import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const handleSubmit = () => {
    const email = document.getElementById("txt1").value;
    const password = document.getElementById("txt2").value;
    fetch("http://localhost:3000/submit", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res)
        if (res.status === 401) {
          console.log("invalid credentials123");
        }
        return res.json();
      })
      .then((res) => {
        console.log("data",res);
        fetch("http://localhost:3000/verify", {
          method: "GET",
          headers: {
            authorization: res.token,
          },
        })
          .then((res) => {
            if (res.status === 401) {
              console.log("invalid token");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data.msg);
          
        })
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          width: "600px",
          height: "300px",
          border: "2px solid black",
        }}
      >
        <input id="txt1" placeholder="Email"></input>
        <input id="txt2" placeholder="Password"></input>
        <button onClick={handleSubmit}>submit</button>
      </div>
    </>
  );
}

export default App;
