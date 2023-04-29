import Cookies from 'js-cookie';

// url
// pages, scene
const cookieStrategy = {
  get: (url: string) => {
    if (url.charAt(0) !== '/') {
      url = '/' + url;
    }
    const cookieString = Cookies.get(url);
    if (url === '/pages' && !cookieString) {
      // initial page state for demo purpose
      return [
        {
          pageId: 'demo-page',
          title: 'Manufacturing room, Floor 1',
          alarmLevel: 3
        }
      ];
    }

    if (url.startsWith('/scene') && !cookieString) {
      if (url === '/scene/demo-page') {
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
    }
    console.log(cookieString, url);

    return JSON.parse(cookieString || '');
  },
  post: (url: string, data: any) => {
    return Cookies.set(url, data);
  }
};

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

const strategy = cookieStrategy;

export const getService = async (url: string) => {
  return { data: strategy.get(url) };
};

export const postService = async (url: string, data: any) => {
  return { data: strategy.post(url, data) };
};
