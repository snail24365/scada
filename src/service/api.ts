import Cookies from 'js-cookie';

/**
 * local storage strategy
 */

const localStorageStrategy = {
  get: (url: string) => {
    const localStorageString = localStorage.getItem(url);

    if (url.includes('pages') && !localStorageString) {
      return [
        {
          pageId: 'demo-page',
          title: 'Manufacturing room, Floor 1',
          alarmLevel: 3
        }
      ];
    }
    if (!localStorageString) return null;
    return JSON.parse(localStorageString);
  },
  post: (url: string, data: any) => {
    return localStorage.setItem(url, JSON.stringify(data));
  }
};

/**
 * cookie strategy
 *
 * @description
 * 1. get: fetch data from cookie
 * 2. post: post data to cookie
 *
 * @warning
 * This is only for demo purpose. In real world, we should use server strategy.
 * But since I don't have a server, I use cookie to simulate the server.
 * It's hard coded intentionally.
 */
const cookieStrategy = {
  get: (url: string) => {
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    const cookieString = Cookies.get(url);
    console.log(`get cookie, url: ${url}, data: ${cookieString}`);

    if (url.includes('pages') && !cookieString) {
      return [
        {
          pageId: 'demo-page',
          title: 'Manufacturing room, Floor 1',
          alarmLevel: 3
        }
      ];
    }

    if (url.includes('demo-page') && !cookieString) {
      return {
        lines: [
          {
            uuid: 'line1',
            type: 'Line',
            points: [
              { x: 100, y: 100 },
              { x: 100, y: 400 }
            ]
          }
        ],
        boxes: [
          {
            uuid: 'box1',
            type: 'Watertank1',
            x: 100,
            y: 100,
            width: 100,
            height: 100
          }
        ]
      };
    }
    return JSON.parse(cookieString || '');
  },
  post: (url: string, data: any) => {
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    console.log(`set cookie, url: ${url}, data: ${JSON.stringify(data)}`);

    return Cookies.set(url, JSON.stringify(data));
  }
};

/**
 * server strategy
 *
 * @description
 * 1. get: fetch data from server
 * 2. post: post data to server
 *
 * @warning
 * this is not used yet, since in this stage I don't have a server. But I will keep this for future use.
 */
const serverStrategy = {
  get: async (url: string) => {
    return fetch(url).then((res) => res.json());
  },
  post: async (url: string, data: any) => {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then((res) => res.json());
  }
};

const strategy = localStorageStrategy;

export const getService = async (url: string) => {
  return { data: strategy.get(url) };
};

export const postService = async (url: string, data: any) => {
  return { data: strategy.post(url, data) };
};
