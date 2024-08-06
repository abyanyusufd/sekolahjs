import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AgendaList = () => {
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    // Fetch the agenda data from your API
    axios
      .get("/api/agendas") // Replace with your API endpoint
      .then((response) => {
        setAgendas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching agendas:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-agenda/${id}`)
        .then(() => {
          setAgendas(agendas.filter((agenda) => agenda.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting agenda:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Semua Agenda</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_agenda"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Tema</th>
                <th>Tgl Mulai</th>
                <th>Tgl Selesai</th>
                <th>Jam</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {agendas.map((agenda, index) => {
                // Convert date format if needed
                const tglMulai = new Date(
                  agenda.tgl_mulai
                ).toLocaleDateString();
                const tglSelesai = new Date(
                  agenda.tgl_selesai
                ).toLocaleDateString();

                return (
                  <tr key={agenda.id_agenda}>
                    <td>{index + 1}</td>
                    <td>{agenda.tema}</td>
                    <td>{tglMulai}</td>
                    <td>{tglSelesai}</td>
                    <td>{agenda.jam}</td>
                    <td>
                      <center>
                        <Link
                          className="btn btn-success btn-xs"
                          title="Edit Data"
                          to={`/administrator/edit_agenda/${agenda.id_agenda}`}
                        >
                          <span className="glyphicon glyphicon-edit"></span>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs"
                          title="Delete Data"
                          onClick={() => handleDelete(agenda.id_agenda)}
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

export default AgendaList;
