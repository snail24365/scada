import { SiteInfo } from '@/features/site/type';
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

  if (url === '/site' && method === 'get') {
    const data: SiteInfo[] = [
      {
        lng: 127.3845475,
        lat: 36.3504119,
        city: 'Daejeon',
        id: 'daejeon',
        address: '755 Hanbat-daero',
        location: '대전광역시 유성구 봉명동 755',
        area: 100,
        numMachines: 10,
        type: 'factory',
        thumbnailUrl: '/thumbnail/daejeon-1.jpg'
      },
      {
        lng: 129.3113596,
        lat: 35.5383773,
        city: 'Ulsan',
        id: 'ulsan',
        address: 'Wonsan-ri 919',
        location: '울산광역시 북구 산업로 919',
        area: 100,
        numMachines: 10,
        type: 'factory',
        thumbnailUrl: '/thumbnail/ulsan-1.png'
      },
      {
        lng: 126.9575991,
        lat: 35.9482858,
        city: 'Iksan',
        id: 'iksan',
        address: '599 Youngje-dong',
        location: '익산시 중구 산업로 321',
        area: 552.23,
        numMachines: 34,
        type: 'factory',
        thumbnailUrl: '/thumbnail/iksan-1.png'
      },
      {
        lng: 127.0018494,
        lat: 36.789796,
        city: 'Asan',
        id: 'asan',
        address: '1077 Hyundai-daero',
        location: '아산시 서구 산업로 51',
        area: 586.23,
        numMachines: 25,
        type: 'factory',
        thumbnailUrl: '/thumbnail/asan-1.png'
      }
    ];
    return data;
  }

  if (url === '/tag-subscription' && method === 'post') {
    localStorage.setItem(url, JSON.stringify(data));
  }

  if (url === '/tag-subscription' && method === 'get') {
    const resultString = localStorage.getItem(url);
    if (!resultString) return null;
    return JSON.parse(resultString);
  }

  if (url === '/tag' && method === 'get') {
    const tags: string[] = data;
    const ret: Record<string, number> = {};
    const timeDependSeudoRandom = (Math.floor(+new Date() / 15000) * 13) % 10;
    tags.forEach((tag) => {
      let value = 0;
      if (tag.startsWith('p')) {
        value = 20 + 4 * timeDependSeudoRandom + Math.random() * 10;
      } else if (tag.startsWith('s')) {
        value = timeDependSeudoRandom / 2 + 5 * Math.random();
      } else {
        value = Math.random() * 100;
      }
      ret[tag] = value;
    });
    return ret;
  }

  if (method === 'get' && url.includes('scene')) {
    const resultString = localStorage.getItem(url);

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
    const pagesToSave = resultString ? JSON.parse(resultString) : [];
    pagesToSave.push(data);
    localStorage.setItem('pages', JSON.stringify(pagesToSave));
    return pagesToSave;
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

  if (method === 'put' && url.includes('pages')) {
    const resultString = localStorage.getItem('pages');
    const pagesToSave = resultString ? JSON.parse(resultString) : [];
    const pageToUpdate = pagesToSave.find((item: ScadaPage) => item.pageId === data.pageId);
    pageToUpdate.title = data.title;
    pageToUpdate.alarmLevel = data.alarmLevel;
    localStorage.setItem('pages', JSON.stringify(pagesToSave));
    return pagesToSave;
  }

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
