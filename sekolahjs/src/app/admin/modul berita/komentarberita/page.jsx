import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const KomentarBerita = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch komentar berita data
    axios
      .get("/api/komentar-berita") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching komentar berita data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-komentarberita/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_komentar !== id));
        })
        .catch((error) => {
          console.error("Error deleting komentar berita:", error);
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
          <h3 className="box-title">Komentar Berita</h3>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th style={{ width: "140px" }}>Nama Komentar</th>
                <th>Isi Komentar</th>
                <th>Aktif</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => {
                const brt = row.id_berita
                  ? record.find((item) => item.id_berita === row.id_berita)
                  : {};
                const bold = row.aktif === "N" ? "bold" : "normal";

                return (
                  <tr key={row.id_komentar} style={{ fontWeight: bold }}>
                    <td>{index + 1}</td>
                    <td>
                      <a
                        target="_BLANK"
                        rel="noopener noreferrer"
                        href={`/berita/detail/${brt.judul_seo}`}
                      >
                        {row.nama_komentar}
                      </a>
                    </td>
                    <td>{row.isi_komentar}</td>
                    <td align="center">{row.aktif}</td>
                    <td>
                      <center>
                        <Link
                          className="btn btn-success btn-xs"
                          title="Edit Data"
                          to={`/administrator/edit_komentarberita/${row.id_komentar}`}
                        >
                          <span className="glyphicon glyphicon-edit"></span>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs"
                          title="Delete Data"
                          onClick={() => handleDelete(row.id_komentar)}
                        >
                          <span className="glyphicon glyphicon-remove"></span>
                        </button>
                      </center>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KomentarBerita;
