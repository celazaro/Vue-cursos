
const API_URL = import.meta.env.VITE_API_URL


export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }

    return await response.json();
  
  } catch (error) {
    console.error('Error en login:', error);
    return null; // Devuelve null si falla
  }
}

