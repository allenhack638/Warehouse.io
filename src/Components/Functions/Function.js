import * as yup from "yup";

export function getColumns(data) {
  const extractColumnKeys = (data) => {
    const columnKeys = new Set();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        columnKeys.add(key);
      });
    });
    return Array.from(columnKeys);
  };

  const columnKeys = extractColumnKeys(data);

  const columns = columnKeys.map((key) => ({
    key,
    label: key,
  }));
  return columns;
}

export const initialValues = {
  ID: "",
  "Avatar Name": "",
  "Performance Score": "",
};
export const validationSchema = yup.object().shape({
  ID: yup.string().required("ID is required"),
  "Avatar Name": yup.string().required("Avatar Name is required"),
  "Performance Score": yup.string().required("Performance Score is required"),
});
