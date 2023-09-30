import React, { useEffect, useState } from "react";
import AddRowForm from "../RowModal/AddRowForm";
import "./GoogleSheetTable.css";

const GoogleSheetTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [FormModal, setFormModal] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        fetch("https://sheetdb.io/api/v1/e7j8052axa9vc")
          .then((response) => response.json())
          .then((data) => setData(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  const syncData = async () => {
    setLoading(true);

    try {
      fetch("https://sheetdb.io/api/v1/e7j8052axa9vc")
        .then((response) => response.json())
        .then((data) => setData(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  const extractColumnKeys = (data) => {
    const columnKeys = new Set();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        columnKeys.add(key);
      });
    });
    return Array.from(columnKeys);
  };

  // Extract column keys from the data
  const columnKeys = extractColumnKeys(data);

  // Create columns dynamically
  const columns = columnKeys.map((key) => ({
    key,
    label: key,
  }));

  return (
    <>
      {FormModal && <AddRowForm onClose={() => setFormModal(false)} />}
      <div className="your-container">
        <button className="fetch-button" onClick={syncData} disabled={loading}>
          {loading ? "syncing..." : "Sync"}
        </button>
        <button onClick={() => setFormModal(true)} className="fetch-button">
          Add a Row
        </button>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="table-header">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GoogleSheetTable;
