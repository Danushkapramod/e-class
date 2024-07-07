import { randomString } from "../utils/genatateString";
import supabase from "./supabase";

export async function uploadImage({ bucketName, imageFile, fileNameHeader }) {
  console.log(bucketName, imageFile, fileNameHeader);
  const string = randomString(10);
  let name = `${fileNameHeader}_${string}.png`;

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(name, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error);
      throw new Error(`Something went wrong. Please try again later.`);
    }
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export function getURL(bucketName, fileName) {
  try {
    const { data, error } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);
    if (error) {
      console.error(error);
      throw new Error(`Something went wrong. Please try again later.`);
    }
    return data.publicUrl;
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function deleteImage({ bucketName, fileName }) {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([fileName]);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}

export async function replaceImage({ bucketName, fileName, imageFile }) {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .update(fileName, imageFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error(`An unexpected error occurred. Please try again later.`);
  }
}
