/* eslint-disable import/prefer-default-export */
// import "babel-polyfill";

let download = require("downloadjs");

export const request = async (method, url, data) => {
  // console.log(method, url, data);
  const opts = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  try {
    const res = await fetch(url, opts);
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const requestDelete = async (method, url, jwt, FP) => {
  console.log(method, url);
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    }
  };
  try {
    const res = await fetch(url, opts);
    const response = await res.json();
    console.log(response, "response");
    return response;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};

export const requestJwt = (method, url, data, jwt) => {
  const opts =
    method === "GET"
      ? {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          }
        }
      : {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          },
          body: data && JSON.stringify(data)
        };
  return fetch(url, opts)
    .then(res =>
      res.json().then(jsonData => ({ ...jsonData, status: res.status }))
    )
    .then(response => {
      console.log(response, method, url);
      return response;
    })
    .catch(error => {
      console.log(error, "error");
    });
};



export const requestImg = (method, url, data, jwt) => {
  console.log(data)
  const opts =
    method === "GET"
      ? {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          }
        }
      : {
          method,
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          },
          body: data
        };
  return fetch(url, opts)
    .then(res =>
      res.json().then(jsonData => ({ ...jsonData, status: res.status }))
    )
    .then(response => {
      console.log(response, method, url);
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};
export const downloadFile = (method, url, data, jwt, fileName) => {
  const opts =
    method === "GET"
      ? {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          }
        }
      : {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          },
          body: data && JSON.stringify(data)
        };
  return fetch(url, opts)
    .then(function (resp) {
      return resp.blob();
    })
    .then(function (blob) {
      download(blob, fileName);
    })
    .catch(error => error);
};

export const requestSub = async (method, url, data) => {
  console.log(method, url, "ourjsbfkqeoujk");
  const opts =
    method === "GET"
      ? {
          method,
          headers: {
            "Content-Type": "application/json"
          }
        }
      : {
          method,
          headers: {
            "Content-Type": "application/json"
          },
          body: data && JSON.stringify(data)
        };
  return fetch(url, opts)
    .then(res =>
      res.json().then(jsonData => ({ ...jsonData, status: res.status }))
    )
    .then(response => {
      console.log(response, method, url);
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};
