import axios from "axios";
import { BASE_URL } from "./apiData";
const bucket = "aws-bucket-e-class";


export async function uploadFile(path, file) {
  try {
    const respons = await axios.post(
      `${BASE_URL}/awsSignedUrl/upload`,
      {
        path,
        bucket,
      },
    );
    const signedUrl = respons.data.URL;

    await axios.put(signedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    return signedUrl.split("?")[0];
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function updateAvatar(mainFile, currentdbUrl, path) {
  try {
    if (currentdbUrl) {
      await deleteFile(currentdbUrl.split("amazonaws.com/")[1]);
    }
    const newFileUrl = await uploadFile(path, mainFile);
    return newFileUrl;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteFile(fileName) {
  try {
    await axios.post(`${BASE_URL}/awsSignedUrl/delete`, {
      fileName,
      bucket,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}
