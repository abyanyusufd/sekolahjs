import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "ionicons/dist/css/ionicons.min.css";
import "./styles.css"; // Your custom styles, if any

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", { email, password }) // Replace with your actual API endpoint
      .then((response) => {
        // Handle successful login
        navigate("/");
      })
      .catch((error) => {
        // Handle login error
        setAlertMessage("Login failed. Please check your credentials.");
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    axios
      .post("/api/forgot-password", { email }) // Replace with your actual API endpoint
      .then((response) => {
        setAlertMessage("Password reset link sent to your email.");
        setShowModal(false);
      })
      .catch((error) => {
        setAlertMessage("Error sending password reset link.");
      });
  };

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="#">
          <b>ADMIN</b> Login
        </a>
      </div>
      <div className="login-box-body">
        <p className="login-box-msg">Silahkan Login Pada Form dibawah ini</p>
        {alertMessage && (
          <div className="alert alert-warning">
            <center>{alertMessage}</center>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group has-feedback">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div className="row">
            <div className="col-xs-8">
              <div className="checkbox icheck">
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
              </div>
            </div>
            <div className="col-xs-4">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-flat"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
        <hr />
        <a href="#!" onClick={() => setShowModal(true)}>
          Anda Lupa Password?
        </a>
      </div>

      {/* Modal for forgot password */}
      {showModal && (
        <div
          className="modal fade show"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                <h5 className="modal-title">Lupa Password Login?</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleForgotPassword}>
                  <div className="form-group">
                    <center style={{ color: "red" }}>
                      Masukkan Email yang terkait dengan akun!
                    </center>
                    <br />
                    <label className="col-sm-2 control-label">Email</label>
                    <div className="input-group col-sm-8">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope fa-fw"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-3">
                      <button type="submit" className="btn btn-primary btn-sm">
                        Kirimkan Permintaan
                      </button>
                      <a
                        href="#!"
                        onClick={() => setShowModal(false)}
                        title="Kembali Login?"
                      >
                        Kembali Login?
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
