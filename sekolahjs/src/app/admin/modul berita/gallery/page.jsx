import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch gallery data
    axios
      .get("/api/gallery") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-gallery/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_gallery !== id));
        })
        .catch((error) => {
          console.error("Error deleting gallery:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Gallery Berita Foto</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_gallery"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th style={{ width: "60px" }}>Foto</th>
                <th>Judul Foto</th>
                <th>Nama Album</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_gallery}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`/asset/img_galeri/${row.gbr_gallery}`}
                      alt={row.jdl_gallery}
                      width="50"
                    />
                  </td>
                  <td>{row.jdl_gallery}</td>
                  <td>{row.jdl_album}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_gallery/${row.id_gallery}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_gallery)}
                      >
                        <span className="glyphicon glyphicon-remove"></span>
                      </button>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
