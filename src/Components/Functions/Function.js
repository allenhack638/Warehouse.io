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
