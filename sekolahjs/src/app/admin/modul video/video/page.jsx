import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SemuaVideo = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch video data
    axios
      .get("/api/videos") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-video/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_video !== id));
        })
        .catch((error) => {
          console.error("Error deleting video:", error);
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
          <h3 className="box-title">Semua Video</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_video"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Judul Video</th>
                <th>Tanggal Video</th>
                <th>Playlist</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_video}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      target="_BLANK"
                      rel="noopener noreferrer"
                      href={`/video/detail/${row.video_seo}`}
                    >
                      {row.jdl_video}
                    </a>
                  </td>
                  <td>{new Date(row.tanggal).toLocaleDateString("id-ID")}</td>
                  <td>{row.jdl_playlist}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_video/${row.id_video}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_video)}
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

export default SemuaVideo;
