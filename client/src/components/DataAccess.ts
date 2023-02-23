import axios from "axios";

export const uploadFile = (data: any) =>
  axios.post("http://localhost:5000/uploadFile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
});

export const deleteFile = (id: any) =>
  axios.delete(`http://localhost:5000/deleteFile/${id}`);
