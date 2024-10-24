import axios from 'axios';

export function NumberToMoney(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function MoneyToNumber(s: string) {
  return s.replace('/,/g', '');
}

export async function urlToBlob(url: string) {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
    });

    const ext = response.headers['content-type'].split('/')[1];

    console.log(`fetching ${url} ...`);
    console.log(response);
    console.log(ext);
    console.log('======');

    return {
      data: response.data,
      ext,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
