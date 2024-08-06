import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TemplateWebsite = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Fetch the template data from your API
    axios
      .get("/api/templates") // Replace with your API endpoint
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching templates:", error);
      });
  }, []);

  const handleActivate = (id, currentStatus) => {
    const newStatus = currentStatus === "Y" ? "N" : "Y";
    axios
      .post(`/api/activate-template/${id}/${newStatus}`)
      .then(() => {
        // Update the state to reflect the change
        setTemplates(
          templates.map((template) =>
            template.id === id ? { ...template, aktif: newStatus } : template
          )
        );
      })
      .catch((error) => {
        console.error("Error activating template:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-template/${id}`)
        .then(() => {
          setTemplates(templates.filter((template) => template.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting template:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Template Website</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_templatewebsite"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Nama Template</th>
                <th>Pembuat</th>
                <th>Directory</th>
                <th>Aktif</th>
                <th style={{ width: "90px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template, index) => {
                const icon = template.aktif === "Y" ? "star" : "star-empty";
                const color = template.aktif === "Y" ? "orange" : "#8a8a8a";

                return (
                  <tr key={template.id}>
                    <td>{index + 1}</td>
                    <td>{template.judul}</td>
                    <td>{template.pembuat}</td>
                    <td>{template.folder}</td>
                    <td>{template.aktif}</td>
                    <td>
                      <center>
                        <button
                          className="btn btn-default btn-xs"
                          title="Aktifkan"
                          style={{ color }}
                          onClick={() =>
                            handleActivate(template.id, template.aktif)
                          }
                        >
                          <span
                            className={`glyphicon glyphicon-${icon}`}
                          ></span>
                        </button>
                        <Link
                          className="btn btn-success btn-xs"
                          title="Edit Data"
                          to={`/administrator/edit_templatewebsite/${template.id}`}
                        >
                          <span className="glyphicon glyphicon-edit"></span>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs"
                          title="Delete Data"
                          onClick={() => handleDelete(template.id)}
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

export default TemplateWebsite;
