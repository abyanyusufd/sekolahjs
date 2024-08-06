import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UpdateLogo = () => {
  const [logo, setLogo] = useState(null);
  const [file, setFile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Fetch the current logo data
    axios
      .get("/api/logo") // Replace with your API endpoint
      .then((response) => {
        setLogo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching logo data:", error);
      });
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("logo", file);

    axios
      .post("/api/update-logo", formData) // Replace with your API endpoint
      .then((response) => {
        alert("Logo updated successfully");
        history.push("/"); // Redirect to home or another page
      })
      .catch((error) => {
        console.error("Error updating logo:", error);
      });
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Ganti Logo Website</h3>
        </div>
        <div className="box-body">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="form-horizontal"
            role="form"
          >
            <table id="example" className="table table-bordered table-striped">
              <tbody>
                {logo && (
                  <>
                    <tr>
                      <td width="120px">Logo Terpasang</td>
                      <td>
                        <a href="#">
                          <img
                            width="100%"
                            src={`/asset/logo/${logo.gambar}`}
                            alt="Current Logo"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Ganti Logo</td>
                      <td>
                        <input
                          type="file"
                          name="logo"
                          className="form-control"
                          onChange={handleFileChange}
                        />
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <td></td>
                  <td>
                    <div className="box-footer">
                      <button type="submit" className="btn btn-info">
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-default pull-right"
                        onClick={() => history.push("/")}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLogo;
