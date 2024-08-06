import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactAddress = () => {
  const [address, setAddress] = useState("");
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current contact address data
    axios
      .get("/api/contact-address") // Replace with your API endpoint
      .then((response) => {
        setAddress(response.data.alamat);
        setId(response.data.id_alamat);
      })
      .catch((error) => {
        console.error("Error fetching contact address:", error);
      });
  }, []);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/update-address", { id, alamat: address })
      .then(() => {
        alert("Address updated successfully");
        navigate("/"); // Redirect to another page or stay on the same page
      })
      .catch((error) => {
        console.error("Error updating address:", error);
      });
  };

  return (
    <div className="col-md-12">
      <div className="box box-info">
        <div className="box-header with-border">
          <h3 className="box-title">Alamat Kontak</h3>
        </div>
        <div className="box-body">
          <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <table className="table table-condensed table-bordered">
                <tbody>
                  <input type="hidden" name="id" value={id} />
                  <tr>
                    <td>
                      <textarea
                        id="editor1"
                        className="form-control"
                        name="a"
                        style={{ height: "260px" }}
                        required
                        value={address}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="box-footer">
              <button type="submit" className="btn btn-info">
                Update
              </button>
              <button
                type="button"
                className="btn btn-default pull-right"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactAddress;
