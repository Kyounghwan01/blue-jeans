import imageCompression from "browser-image-compression";

export const compressImage = async (image: File) => {
  try {
    const options = {
      maxSizeMb: 1,
      maxWidthOrHeight: 300
    };
    return await imageCompression(image, options);
  } catch (e) {
    console.log(e);
  }
};

export const getPathStorageFromUrl = (url: string) => {
  console.log(url);
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/blue-jean-f30e6.appspot.com/o/";
  let imagePath: string = url.replace(baseUrl, "");
  const indexOfEndPath = imagePath.indexOf("?");
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = decodeURIComponent(imagePath.replace("%2F", "/"));
  return imagePath;
};
