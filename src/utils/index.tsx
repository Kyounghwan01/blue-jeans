import imageCompression from "browser-image-compression";
import dayjs from "dayjs";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

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
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/blue-jean-f30e6.appspot.com/o/";
  let imagePath: string = url.replace(baseUrl, "");
  const indexOfEndPath = imagePath.indexOf("?");
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = decodeURIComponent(imagePath.replace("%2F", "/"));
  return imagePath;
};

export const validtionCriteria = {
  nickName: {
    pattern: /^[가-힣a-zA-Z\s]{2,12}$/,
    error: "2자 이상 12자 이하 한글/영문으로 입력해 주세요"
  }
};

export const validation = (
  data: string,
  type: { pattern: RegExp; error: string }
) => {
  if (!data) {
    return false;
  }
  return type.pattern.test(data);
};

export const handleFileButton = (
  e: React.MouseEvent<HTMLDivElement>,
  fileRef: any
) => {
  e.preventDefault();
  if (!fileRef.current) return;
  fileRef.current.click();
};

/** 날짜 유틸 */
const format = {
  dateFullFormat: "YYYY-MM-DD (ddd) HH:mm",
  dateFormatWithoutTime: "YYYY-MM-DD (ddd)",
  dateFullZeroTime: "YYYY-MM-DD (ddd) 00:00"
} as { [key: string]: string };

export const getDateCustomFormat = (format: string) => {
  return dayjs().format(format);
};

export const currentDateWithoutTime = (date: string): string => {
  return dayjs(date, format.dateFullFormat).format(
    format.dateFormatWithoutTime
  );
};

export const addSubtractDate = (
  date: string,
  dateFormat = "dateFullFormat",
  type: "add" | "subtract",
  days = 1,
  handleingType: "day" | "month" | "year"
) => {
  if (type === "add") {
    return dayjs(date, format.dateFullFormat)
      .add(days, handleingType)
      .format(format[dateFormat]);
  } else {
    return dayjs(date, format.dateFullFormat)
      .subtract(days, handleingType)
      .format(format[dateFormat]);
  }
};

export function getFirebaseDocs<T>(document: QuerySnapshot<DocumentData>): T {
  return document.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  })) as any;
}
