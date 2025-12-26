export const request = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333'
  const response = await fetch(`${apiUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}
