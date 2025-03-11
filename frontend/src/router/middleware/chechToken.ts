export async function isAuthenticated() {
  try {
    const response = await fetch('http://192.168.0.183:4000/api/auth/check', { credentials: 'include' });
    return response.ok;
  } catch (error) {
    return false;
  }
}
