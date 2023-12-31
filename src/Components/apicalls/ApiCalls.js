import { toast } from "react-toastify";
const BASE_URL = "https://sheetdb.io/api/v1/e7j8052axa9vc";

export const CreateRow = async (values) => {
  try {
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
    toast.success("Row Created successfully");
    return data;
  } catch (error) {
    toast.error("Unable to add a Row");
    console.log(error);
  }
};

export const SyncData = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Failed to fetch");
    console.log(error);
  }
};
