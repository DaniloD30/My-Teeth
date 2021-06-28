import Constants from "~/helpers/enums/Constants";
import { toast } from "react-toastify";

export const startLoading = (identifier) => ({
  type: Constants.UPDATE_LOADING,
  loading: { [identifier]: true },
});

export const endLoading = (identifier) => ({
  type: Constants.UPDATE_LOADING,
  loading: { [identifier]: false },
});

const isValidEmail = (email) => {
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  return emailRegex.test(email);
};

const filterData = (items, val) => {
  let searchedItems = items.filter((item) => {
    return Object.keys(item).some((key) => {
      return String(item[key]).toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  });

  return searchedItems;
};

export const showToast = ({ description, type }, props = () => {}) => {
  toast(description, {
    type: type,
    position: toast.POSITION.TOP_CENTER,
    ...props,
  });
};

export const showError = (error) => {
  showToast({
    type: "error",
    description: error,
  });
};

export const fileToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.readAsDataURL(file);
  });
};

export const stringBase64ToObjectBase64 = (base64String) => {
  return {
    data: base64String.split(",")[1],
    contentType: base64String.split(",")[0].split(";")[0].split(":")[1],
  };
};

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  return new Blob(byteArrays, { type: contentType });
};

const base64ToArrayBuffer = (base64) => {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};
function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const ab2str = (buf) => {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
};

export const getFormatHour = (startTime, endTime) => {
  let d = new Date(startTime);
  let e = new Date(endTime);
  let horaStart = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
  let minStart = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

  let horaEnd = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
  let minEnd = e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();

  return `${horaStart}:${minStart} - ${horaEnd}:${minEnd}`;
};

export const getFormatDay = (startTime) => {
  let data = new Date(startTime);
  // item.pacient = item
  // a data tbm tem que verificar se é menor que 10
  let day = data?.getDate() < 10 ? `0${data?.getDate()}` : `${data?.getDate()}`;
  let month =
    data?.getMonth() + 1 < 10
      ? `0${data?.getMonth() + 1}`
      : `${data?.getMonth() + 1}`;
  let year = `${data?.getFullYear()}`;
  return `${day}/${month}/${year}`;
};
const Utils = {
  endLoading,
  startLoading,
  filterData,
  isValidEmail,
  b64toBlob,
  stringBase64ToObjectBase64,
  fileToBase64,
  base64ToArrayBuffer,
  showToast,
  getFormatDay,
  getFormatHour,
  showError,
  ab2str,
  _arrayBufferToBase64,
};
export default Utils;
