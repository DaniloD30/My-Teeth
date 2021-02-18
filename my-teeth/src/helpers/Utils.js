import Constants from "~/helpers/enums/Constants";
// import { toast } from "react-toastify";

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

// export const showToast = (
//   { description, type },
//   props = () => {}
// ) => {
//   toast(description, {
//     type: type,
//     position: toast.POSITION.TOP_CENTER,
//     ...props,
//   });
// };

// export const showError = (error) => {
// 	showToast({
// 		type: "error",
// 		description: error,
// 	});
// };

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

const Utils = {
  endLoading,
  startLoading,
  filterData,
  isValidEmail,
  b64toBlob,
  stringBase64ToObjectBase64,
  fileToBase64,
  base64ToArrayBuffer,
};
export default Utils;
