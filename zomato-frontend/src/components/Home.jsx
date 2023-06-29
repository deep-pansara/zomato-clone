import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Home = (props) => {
  let setFilterPage = (event) => {
    let { value, name } = event.target;
    console.log(value, name);
  };

  let navigate = useNavigate();
  let { locationList } = props;
  let [mealTypeList, setMealTypeList] = useState([]); // state hook

  let getMealType = async () => {
    let url = "http://localhost:3001/api/get-meal-type-list";
    let { data } = await axios.get(url);
    setMealTypeList(data.mealTypeList);
  };

  useEffect(() => {
    getMealType();
  }, []);
  return (
    <>
      <main className="container-fluid">
        <section className="row main-section align-content-start justify-content-center">
          <Header logo={false} user={props.user} />
          <section className="col-12 d-flex flex-column align-items-center justify-content-center">
            <p className="brand-name fw-bold my-lg-2 mb-0">Z</p>
            <p className="h1 text-white my-3 text-center">
              Find the best restaurants, cafés, and bars
            </p>
            <div className="search w-50 d-flex mt-3">
              <select
                type="text"
                className="form-control mb-3 mb-lg-0 me-lg-3 py-2 px-3"
                placeholder="Please type a location"
                onChange={setFilterPage}
              >
                <option value="">--- Select Location ---</option>
                {locationList.map((location, index) => {
                  return (
                    <option key={index} value={location.location_id}>
                      {location.name} , {location.city}
                    </option>
                  );
                })}
              </select>
              <div className="px-3 input-group">
                <span className="input-group-text bg-white">
                  <i className="fa fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control py-1 px-1"
                  placeholder="Search for restaurants"
                />
              </div>
            </div>
          </section>
        </section>
        <section className="row justify-content-center">
          <section className="col-10 mt-3">
            <h3 className="fw-bold text-navy">
              <h1>Quick Searches</h1>
            </h3>
            <p className="text-secondary">Discover restaurants by Searches</p>
          </section>
          <section className="col-10">
            <section className="row py-2">
              <section className="col-12 px-0 d-flex justify-content-between flex-wrap">
                {mealTypeList.map((meal, index) => {
                  return (
                    <section
                      onClick={() =>
                        navigate(`/search/${meal.meal_type}/${meal.name}`)
                      }
                      key={index}
                      className="px-0 d-flex border border-1 quick-search-item"
                    >
                      <img
                        src={"/images/" + meal.image}
                        alt=""
                        className="image-item"
                      />
                      <div className="pt-3 px-2">
                        <h4 className="text-navy">{meal.name}</h4>
                        <p className="small text-muted"> {meal.content}</p>
                      </div>
                    </section>
                  );
                })}
              </section>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
