import React, { useEffect, useState } from "react";
import "./GoogleSheetTable.css";

import AddRowForm from "../RowModal/AddRowForm";
import SyncIcon from "../Icons/MaterialSymbolsDirectorySync";
import RowIcon from "../Icons/MaterialSymbolsTableRowsRounded";
import SheetIcon from "../Icons/MaterialSymbolsSheetsOutline";

import { getColumns } from "../Functions/Function";
import { SyncData } from "../apicalls/ApiCalls";

const GoogleSheetTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [FormModal, setFormModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await SyncData();
      setData(data);
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
        <div className="inner-div">
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
            <SyncIcon />
            {loading ? <p>Syncing</p> : <p>Sync</p>}
          </button>

          <button onClick={() => setFormModal(true)} className="fetch-button">
            <RowIcon />
            <p> Add a Row</p>
          </button>

          <a
            href="https://docs.google.com/spreadsheets/d/1MVWKhUYJgcaxBXu3ESugjfV9aEJIyiwbGECqRD3VS0o/edit#gid=0"
            target="_blank"
            rel="noreferrer"
          >
            <SheetIcon />
            Google Sheet
          </a>
        </div>

        {loading ? (
          <h2>Loading...</h2>
        ) : data?.error ? (
          <h2 className="table-error-message">{data?.error}</h2>
        ) : data?.length === 0 && !loading ? (
          <h2>No data available</h2>
        ) : (
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
        )}

        {/* {data?.error ? (
          <h2 className="table-error-message">{data?.error}</h2> ? (
            data?.length === 0 ?
          ) : (
            <h2></h2>
          )
        ) : ( */}

        {/* )} */}
      </div>
    </>
  );
};

export default GoogleSheetTable;
