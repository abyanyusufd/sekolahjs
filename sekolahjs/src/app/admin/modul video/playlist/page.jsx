import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Playlist = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch playlist data
    axios
      .get("/api/playlist") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playlist data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-playlist/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_playlist !== id));
        })
        .catch((error) => {
          console.error("Error deleting playlist:", error);
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
          <h3 className="box-title">Playlist</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_playlist"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th width="60px">Cover</th>
                <th>Judul Playlist</th>
                <th>Aktif</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_playlist}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`/asset/img_playlist/${row.gbr_playlist}`} // Replace with your actual path
                      alt={row.jdl_playlist}
                      width="50"
                    />
                  </td>
                  <td>{row.jdl_playlist}</td>
                  <td>{row.aktif}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_playlist/${row.id_playlist}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_playlist)}
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

export default Playlist;
