import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DownloadFile = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the download file records
    axios
      .get("/api/download-files") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching download files:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    // Example function to format the date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Download File</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_download"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Judul</th>
                <th>Link</th>
                <th>Hits</th>
                <th>Tanggal</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => (
                <tr key={row.id_download}>
                  <td>{index + 1}</td>
                  <td>{row.judul}</td>
                  <td>
                    <a
                      title={row.nama_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`/download/file/${row.nama_file}`}
                    >
                      Download
                    </a>
                  </td>
                  <td>{row.hits} Kali</td>
                  <td>{formatDate(row.tgl_posting)}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_download/${row.id_download}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <a
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        href={`/administrator/delete_download/${row.id_download}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            window.confirm(
                              "Apa anda yakin untuk hapus Data ini?"
                            )
                          ) {
                            // Trigger the delete request here
                            axios
                              .delete(`/api/delete-download/${row.id_download}`)
                              .then(() => {
                                // Handle success (e.g., update the list)
                                setRecords(
                                  records.filter(
                                    (record) =>
                                      record.id_download !== row.id_download
                                  )
                                );
                              })
                              .catch((error) => {
                                console.error(
                                  "Error deleting download file:",
                                  error
                                );
                              });
                          }
                        }}
                      >
                        <span className="glyphicon glyphicon-remove"></span>
                      </a>
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

export default DownloadFile;
