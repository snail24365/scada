import { ScadaPage } from '@/types/type';
import axios from 'axios';

/**
 * Rest service list
 *
 * get /scene?page-id=[pageID]
 * post /scene?page-id=[pageID] - data(dump)
 *
 * get /pages : get all pages
 * post /pages : add new pages - data(push)
 * delete /pages/page-id : delete pages
 * update /pages/page-id : update pages - data(update)
 *
 */

/**
 * local storage strategy
 *
 * @warning hardcoded, just for demo, mocking the rest api
 */
const localStorageStrategy = async (args: RestServiceParam) => {
  const { method, url, data } = args;

  if (method === 'get' && url.includes('scene')) {
    const resultString = localStorage.getItem(url);
    console.log('resultString', resultString, url);

    if (!resultString) return null;
    return JSON.parse(resultString);
  }

  if (method === 'post' && url.includes('scene')) {
    localStorage.setItem(url, JSON.stringify(data));
    return data;
  }

  if (method === 'get' && url.includes('pages')) {
    const resultString = localStorage.getItem('pages');
    if (!resultString) return [];
    return JSON.parse(resultString);
  }

  if (method === 'post' && url.includes('pages')) {
    const resultString = localStorage.getItem('pages');
    const toSave = resultString ? JSON.parse(resultString) : [];
    toSave.push(data);
    localStorage.setItem('pages', JSON.stringify(toSave));
    return toSave;
  }

  if (method === 'delete' && url.includes('pages')) {
    const resultString = localStorage.getItem('pages');
    if (!resultString) return [];
    let result = JSON.parse(resultString);
    const id = url.replace('/scada/pages/', '');
    const index = result.findIndex((item: ScadaPage) => item.pageId === id);
    result.splice(index, 1);

    localStorage.setItem('pages', JSON.stringify(result));
    return result;
  }

  if (method === 'post' && url.includes('pages')) {
    localStorage.setItem('pages', JSON.stringify(data));
    return data;
  }

  //TODO update
  return null;
};

/**
 * axios strategy
 *
 */
const axiosStrategy = async (args: RestServiceParam) => {
  return axios({
    ...args
  })
    .then((res) => res.data)
    .then((data) => JSON.parse(data));
};

type RestServiceParam = {
  method: string;
  url: string;
  headers?: any;
  data?: any;
};

let strategy = localStorageStrategy;

export const restSerivce = async (args: RestServiceParam) => {
  return strategy(args);
};
