import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  let onSuccess = (credentialResponse) => {
    let token = credentialResponse.credential;
    try {
      let data = jwt_decode(token);
      localStorage.setItem("zc_auth_token", token);
      alert("Login Successfully");
      window.location.assign("/");
      console.log(data);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("zc_auth_token");
    }
  };
  let onError = () => {
    console.log("Login Failed");
  };

  let logout = () => {
    let isLogin = window.confirm("Are you sure to logout ?");
    if (isLogin) {
      localStorage.removeItem("zc_auth_token");
      window.location.reload();
    }
  };
  return (
    <>
      <GoogleOAuthProvider clientId="733493417499-p3aho77ngn3gpl8pt11cq38ilm76lb5k.apps.googleusercontent.com">
        ;
        <div
          className="modal fade"
          id="login-sign-up"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Login / Sign Up
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />;
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-10 d-flex justify-content-between py-2 "
          onClick={() => {
            navigate("/");
          }}
        >
          {props.logo === false ? <p></p> : <p className="m-0 brand">z</p>}

          <div>
            {props.user ? (
              <>
                <button className="btn btn-light">
                  {" "}
                  Welcome, {props.user.name}
                </button>
                <button className="btn btn-warning mx-3" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className="btn  btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target="#login-sign-up"
              >
                Login / Sign up
              </button>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default Header;
