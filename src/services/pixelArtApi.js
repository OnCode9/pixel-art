const baseUrl = import.meta.env.VITE_PIXEL_ART_API

export async function updateCell({id, color}) {
  const response = await fetch(`${baseUrl}/api/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id, color})
  })
  const data = await response.json()
  console.log('UPDATE RESP', data)
  return data
}

export async function insertCell({row, col, color}) {
  const response = await fetch(`${baseUrl}/api/insert`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ row, col, color })
  })
  const data = await response.json()
  console.log('INSERT RESP', data)
  return data
}
