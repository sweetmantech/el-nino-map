import { APP_URL } from '../../../lib/farcaster/consts'

export async function GET() {
  const config = {
    accountAssociation: {
      header:
        'eyJmaWQiOjIxMTc2OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDUwRjU4MTlDNEYyN2JiMjEyMjg2NmM3Yzc2NTg2M0QyMWY1YTcxZjEifQ',
      payload: 'eyJkb21haW4iOiJtYXJhdmlsbGEuY2l0eSJ9',
      signature:
        'MHhmNGJmNzMzMjYwNjE4NmJjNWE3YzJmMTAxOTlhMTIyYmQyZTQ2ZGY0NTMwY2JiYmIzOTk0M2NkMTYzNTVmMDNjNWI4YTg3Y2IxZTg0Y2FkYjAyNzRkMTczNThiZjUzMzc4MGU5YWEyODQ4ODk0NTUwNGQ5YWQ5MmU3MTI0ZmY0MjFj',
    },
    frame: {
      version: '1',
      name: 'Maravilla City',
      iconUrl: `${APP_URL}/icon.png`,
      homeUrl: APP_URL,
      imageUrl: `${APP_URL}/image.png`,
      buttonTitle: 'Explore',
      splashImageUrl: `${APP_URL}/favicon.png`,
      splashBackgroundColor: '#151264',
      webhookUrl: `${APP_URL}/api/webhook`,
    },
  }

  return Response.json(config)
}
