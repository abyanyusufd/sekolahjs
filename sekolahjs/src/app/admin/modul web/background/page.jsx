import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UpdateBackground = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const history = useHistory();

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/update-background", { color: selectedColor }) // Replace with your API endpoint
      .then((response) => {
        alert("Background updated successfully");
        history.push("/"); // Redirect to home or another page
      })
      .catch((error) => {
        console.error("Error updating background:", error);
      });
  };

  return (
    <div className="col-md-12">
      <div className="box box-info">
        <div className="box-header with-border">
          <h3 className="box-title">Background Website</h3>
        </div>
        <div className="box-body">
          <form onSubmit={handleSubmit} className="form-horizontal" role="form">
            <div className="col-md-12">
              <table className="table table-condensed table-bordered">
                <tbody>
                  <tr style={{ backgroundColor: "red" }}>
                    <td>
                      <input
                        type="radio"
                        name="color"
                        value="red"
                        checked={selectedColor === "red"}
                        onChange={handleColorChange}
                      />
                      <b style={{ color: "#fff" }}> Red </b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "green" }}>
                    <td>
                      <input
                        type="radio"
                        name="color"
                        value="green"
                        checked={selectedColor === "green"}
                        onChange={handleColorChange}
                      />
                      <b style={{ color: "#fff" }}> Green </b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "blue" }}>
                    <td>
                      <input
                        type="radio"
                        name="color"
                        value="blue"
                        checked={selectedColor === "blue"}
                        onChange={handleColorChange}
                      />
                      <b style={{ color: "#fff" }}> Blue </b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "orange" }}>
                    <td>
                      <input
                        type="radio"
                        name="color"
                        value="orange"
                        checked={selectedColor === "orange"}
                        onChange={handleColorChange}
                      />
                      <b style={{ color: "#fff" }}> Orange </b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#a4028f" }}>
                    <td>
                      <input
                        type="radio"
                        name="color"
                        value="purple"
                        checked={selectedColor === "purple"}
                        onChange={handleColorChange}
                      />
                      <b style={{ color: "#fff" }}> Purple </b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#fe3e82" }}>
                    <td>
                      <input
                        type="radio"
                        name="color"
                        value="pink"
                        checked={selectedColor === "pink"}
                        onChange={handleColorChange}
                      />
                      <b style={{ color: "#fff" }}> Pink </b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#02967c" }}>
                    <td>
                      <input
                        type="radio"
                        name="color"
                        value="toska"
                        checked={selectedColor === "toska"}
                        onChange={handleColorChange}
                      />
                      <b style={{ color: "#fff" }}> Toska </b>
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#000000" }}>
                    <td>
                      <input
                        type="radio"
                        name="color"
                        value="black"
                        checked={selectedColor === "black"}
                        onChange={handleColorChange}
                      />
                      <b style={{ color: "#fff" }}> Black </b>
                    </td>
                  </tr>
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
                onClick={() => history.push("/")}
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

export default UpdateBackground;
