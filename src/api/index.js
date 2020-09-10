import Constants from './constant';

const api_key = '3154dbbbff682434dd7459501d7cfd0b';

export const get = async (sub_url, query) => {
  let str = '';
  for (let key in query)
    if (query.hasOwnProperty(key)) str += `${key}=${query[key]}&`;

  let url = `${Constants.BASE_URL}${sub_url}?${str}api_key=${api_key}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    debugger;
    if (response.status == 200) return data;
    throw data.errors || data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const imagePath = (image) => {
  return `${Constants.IMAGE}${image}`;
};
