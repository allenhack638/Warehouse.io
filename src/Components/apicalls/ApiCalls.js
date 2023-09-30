const BASE_URL = "https://sheetdb.io/api/v1/e7j8052axa9vc";

export const CreateRow = async (values) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [values],
    }),
  });
  const data = await response.json();
  return data;
};

export const SyncData = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};
