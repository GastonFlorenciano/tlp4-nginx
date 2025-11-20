export const API_URL = '/api';

export async function fetchAPI(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Solicitud API fallida con estado ${response.status}: ${errorText || 'Error sin cuerpo'}`);
    }
    if (response.status === 204) {
        return null; 
    }
    try {
        return response.json();
    } catch (e) {
        throw new Error("Respuesta recibida pero no es JSON válido.");
    }
}