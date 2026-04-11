interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  message: string;
  status: number;
}

class FetchService {
  private getAuthHeaders(): Record<string, string> {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as ApiError & {
        error?: string;
      };

      throw new Error(
        errorData.message ||
          errorData.error ||
          `Erreur ${response.status}`
      );
    }

    const data = await response.json();
    return {
      data,
      status: response.status
    };
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      throw new Error(`Erreur lors de la requête GET: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  async post<T, D = Record<string, unknown>>(url: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      throw new Error(`Erreur lors de la requête POST: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  async patch<T, D = Record<string, unknown>>(url: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      throw new Error(`Erreur lors de la requête PATCH: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }
}


export const fetchService = new FetchService();
export default fetchService;

