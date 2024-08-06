import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserForm = ({ user, record, access }) => {
  const [formData, setFormData] = useState({
    username: user.username || "",
    password: "",
    fullName: user.nama_lengkap || "",
    email: user.email || "",
    phone: user.no_telp || "",
    photo: user.foto || "users.gif",
    block: user.blokir || "N",
    modules: user.modules || [],
  });

  const [showPhoto, setShowPhoto] = useState(user.foto || "users.gif");
  const [isAdmin, setIsAdmin] = useState(false); // Replace with your logic to check admin status

  useEffect(() => {
    // Assuming `user` prop includes `level` to check admin status
    setIsAdmin(user.level === "admin");
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
    setShowPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }
    axios
      .post("/api/edit-manajemenuser", formDataToSubmit) // Replace with your API endpoint
      .then((response) => {
        // Handle successful response
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className="col-md-12">
      <div className="box box-info">
        <div className="box-header with-border">
          <h3 className="box-title">Edit Data {formData.username}</h3>
        </div>
        <div className="box-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="col-md-12">
              <table className="table table-condensed table-bordered">
                <tbody>
                  <input type="hidden" name="id" value={formData.username} />
                  <input type="hidden" name="ids" value={user.id_session} />
                  <tr>
                    <th width="120px" scope="row">
                      Username
                    </th>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Password</th>
                    <td>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Nama Lengkap</th>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Alamat Email</th>
                    <td>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">No Telepon</th>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Ganti Foto</th>
                    <td>
                      <input
                        type="file"
                        className="form-control"
                        name="photo"
                        onChange={handleFileChange}
                      />
                      <hr style={{ margin: "5px" }} />
                      {formData.photo && (
                        <div>
                          <i style={{ color: "red" }}>Foto Saat ini: </i>
                          <a
                            target="_BLANK"
                            rel="noopener noreferrer"
                            href={`/asset/foto_user/${formData.photo}`}
                          >
                            {formData.photo}
                          </a>
                        </div>
                      )}
                      {showPhoto && (
                        <img
                          src={showPhoto}
                          alt="Preview"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      )}
                    </td>
                  </tr>
                  {isAdmin && (
                    <>
                      <tr>
                        <th scope="row">Blokir</th>
                        <td>
                          <input
                            type="radio"
                            name="block"
                            value="Y"
                            checked={formData.block === "Y"}
                            onChange={handleInputChange}
                          />{" "}
                          Ya &nbsp;
                          <input
                            type="radio"
                            name="block"
                            value="N"
                            checked={formData.block === "N"}
                            onChange={handleInputChange}
                          />{" "}
                          Tidak
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Tambah Akses</th>
                        <td>
                          <div className="checkbox-scroll">
                            {record.map((mod) => (
                              <div key={mod.id_modul}>
                                <input
                                  type="checkbox"
                                  name="modules"
                                  value={mod.id_modul}
                                  checked={formData.modules.includes(
                                    mod.id_modul
                                  )}
                                  onChange={handleInputChange}
                                />{" "}
                                {mod.nama_modul}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Hak Akses</th>
                        <td>
                          <div className="checkbox-scroll">
                            {access.map((acc) => (
                              <div key={acc.id_umod}>
                                <a
                                  className="text-danger"
                                  href={`/administrator/delete_akses/${acc.id_umod}/${user.id_session}`}
                                >
                                  <span className="glyphicon glyphicon-remove"></span>
                                </a>{" "}
                                {acc.nama_modul}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
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
                onClick={() => (window.location.href = "/")}
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

export default EditUserForm;
