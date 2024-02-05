import Supabase from '../../src/services/supabase'

export async function onRequestPost(context) {
  const { request, env } = context;

  const client = new Supabase({
    url: env.VITE_SUPABASE_URL,
    key: env.SUPABASE_KEY_READWRITE,
    tablePrefix: env.VITE_TABLE_PREFIX
  })

  const requestData = await request.json();
  console.log('UPDATE REQUEST', requestData)
  const databaseResponse = await client.updateCell(requestData)

  return new Response(
    JSON.stringify(databaseResponse),
    {
			headers: {
				'content-type': 'application/json',
			},
		}
  )
}
