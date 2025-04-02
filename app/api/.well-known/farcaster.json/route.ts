export async function GET() {
  const config = {
    accountAssociation: {
      header:
        'eyJmaWQiOjEwNDM3NzMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhGREQ0MTY5ZjFBMUJmRjU3MjQ3NWQ5ZTg1MDgzYUE2MjY4ZjUyZkUxIn0',
      payload: 'eyJkb21haW4iOiJlbC1uaW5vLW1hcC52ZXJjZWwuYXBwIn0',
      signature:
        'MHgxYzJkODgyNDhjMzFjYTYwNzUwOGJjMjM0MWVhNTE5NGY0ZjU4NDM0MTdiMDUxYzlkYTMyMDFkNTQwY2U3ODc3MzBhMWIzZTk1OTljYTE1Y2M2MGNjYzU1YmEwMzM1NWFmYWUzNmYwNzU2NDE5YWM0NzUwZTU0NTExYjJiYzNjZTFj',
    },
    frame: {
      version: '1',
      name: 'Example Frame',
      iconUrl: 'https://el-nino-map.vercel.app/icon.png',
      homeUrl: 'https://el-nino-map.vercel.app',
      imageUrl: 'https://el-nino-map.vercel.app/image.png',
      buttonTitle: 'Check this out',
      splashImageUrl: 'https://el-nino-map.vercel.app/splash.png',
      splashBackgroundColor: '#eeccff',
      webhookUrl: 'https://el-nino-map.vercel.app/api/webhook',
    },
  }

  return Response.json(config)
}
