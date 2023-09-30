import React, { useEffect, useState } from "react";
import "./GoogleSheetTable.css";

import AddRowForm from "../RowModal/AddRowForm";
import { getColumns } from "../Functions/Function";
import { SyncData } from "../apicalls/ApiCalls";

const GoogleSheetTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [FormModal, setFormModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await SyncData();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const onSubmit = async () => {
    setFormModal(false);
    setLoading(true);
    const data = await SyncData();
    setData(data);
    setLoading(false);
  };

  return (
    <>
      {FormModal && (
        <AddRowForm onClose={() => setFormModal(false)} onSubmit={onSubmit} />
      )}
      <div className="your-container">
        <button
          className="fetch-button"
          onClick={async () => {
            setLoading(true);
            const data = await SyncData();
            setData(data);
            setLoading(false);
          }}
          disabled={loading}
        >
          {loading ? "Syncing..." : "Sync"}
        </button>

        <button onClick={() => setFormModal(true)} className="fetch-button">
          Add a Row
        </button>

        <a
          href="https://docs.google.com/spreadsheets/d/1MVWKhUYJgcaxBXu3ESugjfV9aEJIyiwbGECqRD3VS0o/edit#gid=0"
          target="_blank"
          rel="noreferrer"
        >
          Google Sheet
        </a>
        <table className="data-table">
          <thead>
            <tr>
              {getColumns(data)?.map((column) => (
                <th key={column.key} className="table-header">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {getColumns(data)?.map((column) => (
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
