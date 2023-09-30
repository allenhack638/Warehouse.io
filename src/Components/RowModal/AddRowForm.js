import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import "./Modal.css";

import { CreateRow } from "../apicalls/ApiCalls";

const AddRowForm = ({ onClose }) => {
  async function handleSubmit(values) {
    try {
      await CreateRow(values);
    } catch (error) {
      console.log(error);
    }
    onClose();
  }

  const initialValues = {
    ID: "",
    "Avatar Name": "",
    "Performance Score": "",
  };
  const validationSchema = yup.object().shape({
    ID: yup.string().required("ID is required"),
    "Avatar Name": yup.string().required("Avatar Name is required"),
    "Performance Score": yup.string().required("Performance Score is required"),
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3 className="add-an-row">Add an Row</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => {
            return (
              <Form>
                <label htmlFor="ID">ID:</label>
                <input
                  type="text"
                  id="ID"
                  name="ID"
                  value={values.ID}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 003"
                />
                {errors.ID && touched.ID && (
                  <p className="error-message">{errors.ID}</p>
                )}
                <label htmlFor="Avatar Name">Avatar Name:</label>
                <input
                  type="text"
                  id="Avatar Name"
                  name="Avatar Name"
                  value={values["Avatar Name"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Test 1"
                />
                {errors["Avatar Name"] && touched["Avatar Name"] && (
                  <p className="error-message">{errors["Avatar Name"]}</p>
                )}
                <label htmlFor="Performance Score">Performance Score:</label>
                <input
                  type="text"
                  id="Performance Score"
                  name="Performance Score"
                  value={values["Performance Score"]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 8"
                />
                {errors["Performance Score"] &&
                  touched["Performance Score"] && (
                    <p className="error-message">
                      {errors["Performance Score"]}
                    </p>
                  )}
                <button type="submit" className="add-button">
                  Add Row
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddRowForm;
