// pages/admin/identitas-website.js
import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";

const IdentitasWebsite = () => {
  const [formData, setFormData] = useState({
    id: "",
    namaWebsite: "",
    email: "",
    domain: "",
    sosialNetwork: "",
    noRekening: "",
    noTelpon: "",
    metaDeskripsi: "",
    metaKeyword: "",
    googleMaps: "",
    favicon: "",
  });

  const [faviconPreview, setFaviconPreview] = useState("");

  useEffect(() => {
    // Fetch existing data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/identitaswebsite"); // Ganti dengan endpoint API yang sesuai
        setFormData(response.data);
        setFaviconPreview(
          response.data.favicon ? `/asset/images/${response.data.favicon}` : ""
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("/api/identitaswebsite", data); // Ganti dengan endpoint API yang sesuai
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    }
  };

  return (
    <>
      <Head>
        <title>Identitas Website</title>
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        />
        <link rel="stylesheet" href="/dist/css/AdminLTE.min.css" />
        <link rel="stylesheet" href="/plugins/iCheck/square/blue.css" />
      </Head>

      <div className="container">
        <div className="col-md-12">
          <div className="box box-info">
            <div className="box-header with-border">
              <h3 className="box-title">Identitas Website</h3>
            </div>
            <div className="box-body">
              <form
                className="form-horizontal"
                role="form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="col-md-12">
                  <table className="table table-condensed table-bordered">
                    <tbody>
                      <input type="hidden" name="id" value={formData.id} />
                      <tr>
                        <th width="120px" scope="row">
                          Nama Website
                        </th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="namaWebsite"
                            value={formData.namaWebsite}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Domain</th>
                        <td>
                          <input
                            type="url"
                            className="form-control"
                            name="domain"
                            value={formData.domain}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Sosial Network</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="sosialNetwork"
                            value={formData.sosialNetwork}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">No Rekening</th>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="noRekening"
                            value={formData.noRekening}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">No Telpon</th>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            name="noTelpon"
                            value={formData.noTelpon}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Meta Deskripsi</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="metaDeskripsi"
                            value={formData.metaDeskripsi}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Meta Keyword</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="metaKeyword"
                            value={formData.metaKeyword}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Google Maps</th>
                        <td>
                          <textarea
                            className="form-control"
                            name="googleMaps"
                            style={{ height: "80px" }}
                            value={formData.googleMaps}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Favicon</th>
                        <td>
                          <input
                            type="file"
                            className="form-control"
                            name="favicon"
                            onChange={handleChange}
                          />
                          <hr style={{ margin: "5px" }} />
                          Favicon Aktif Saat ini:
                          {faviconPreview && (
                            <img
                              style={{ width: "32px", height: "32px" }}
                              src={faviconPreview}
                              alt="Current Favicon"
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="box-footer">
                  <button type="submit" name="submit" className="btn btn-info">
                    Update
                  </button>
                  <a href="/">
                    <button
                      type="button"
                      className="btn btn-default pull-right"
                    >
                      Cancel
                    </button>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdentitasWebsite;
