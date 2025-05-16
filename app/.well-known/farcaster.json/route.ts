import { APP_URL } from '../../../lib/farcaster/consts'

export async function GET() {
  const config = {
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    frame: {
      version: '1',
      name: 'Maravilla City',
      iconUrl: `${APP_URL}/icon.png`,
      homeUrl: APP_URL,
      imageUrl: `${APP_URL}/image.png`,
      buttonTitle: 'Explore',
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#151264',
      webhookUrl: `${APP_URL}/api/webhook`,
    },
  }

  return Response.json(config)
}
