import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Album = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch album data
    axios
      .get("/api/album") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching album data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-album/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_album !== id));
        })
        .catch((error) => {
          console.error("Error deleting album:", error);
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
          <h3 className="box-title">Album Berita Foto</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_album"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th style={{ width: "60px" }}>Cover</th>
                <th>Judul Berita Foto</th>
                <th>Url</th>
                <th>Aktif</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_album}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`/asset/img_album/${row.gbr_album}`}
                      alt={row.jdl_album}
                      width="50"
                    />
                  </td>
                  <td>{row.jdl_album}</td>
                  <td>
                    <a
                      target="_BLANK"
                      rel="noopener noreferrer"
                      href={`/album/detail/${row.album_seo}`}
                    >
                      album/detail/{row.album_seo}
                    </a>
                  </td>
                  <td>{row.aktif}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_album/${row.id_album}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_album)}
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

export default Album;
