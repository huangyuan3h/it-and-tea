import { parseCookies } from 'nookies';

export const isBrowser = () => typeof window !== 'undefined';

class APIClient {
  private static readonly baseUrl: string =
    process.env.NEXT_PUBLIC_BACKEND_API ?? '';

  private static authCookie: string = '';

  constructor(authCookie?: string) {
    APIClient.authCookie = authCookie ?? '';
  }

  static getAuthToken(): string {
    if (!isBrowser()) {
      return APIClient.authCookie;
    }
    const cookies = parseCookies();
    return cookies['Authorization'];
  }

  async post(url: string, body: object): Promise<any> {
    const authStr = APIClient.getAuthToken();
    const response = await fetch(APIClient.baseUrl + url, {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        Authorization: authStr ?? '',
      },
    });
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const data = await response.json();

    return data;
  }

  async get(url: string): Promise<any> {
    const authStr = APIClient.getAuthToken();
    const response = await fetch(APIClient.baseUrl + url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: authStr ?? '',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const data = await response.json();

    return data;
  }
}

export default APIClient;
