import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

function App() {
  let getUserDetails = () => {
    let token = localStorage.getItem("zc_auth_token");
    if (token === null) {
      return null;
    } else {
      try {
        let data = jwt_decode(token);
        return data;
      } catch (error) {
        return null;
      }
    }
  };

  let [user, setUser] = useState(getUserDetails());
  let [locationList, setLocationList] = useState([]); // state hook
  let getLocationList = async () => {
    try {
      let url = "http://localhost:3001/api/get-location-list";
      let { data } = await axios.get(url);
      setLocationList(data.locationList); // updating locationList
    } catch (error) {
      alert("server error");
    }
  };
  useEffect(() => {
    getLocationList();
    console.log(user);
    // console.log("mounting");
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home locationList={locationList} user={user} />}
        />
        <Route
          path="/search/:id/:name"
          element={<Search locationList={locationList} user={user} />}
        />
        <Route path="/restaurant/:id" element={<Restaurant user={user} />} />
      </Routes>
    </>
  );
}

export default App;
