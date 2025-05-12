/* eslint-disable no-param-reassign */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i1.sndcdn.com',
      },
      {
        hostname: 'i.scdn.co',
      },
      {
        hostname: '*.cloudfront.net',
      },
      {
        hostname: 'soundcloud.com',
      },
      {
        hostname: 'imagedelivery.net',
      },
      {
        hostname: 'i.imgur.com',
      },
      {
        hostname: 'ipfs.decentralized-content.com',
      },
      {
        hostname: 'i.seadn.io',
      },
      {
        hostname: 'arweave.net',
      },
      {
        hostname: 'static.highongrowth.xyz',
      },
      {
        hostname: 'storage.withfabric.xyz',
      },
      {
        hostname: 'magic.decentralized-content.com',
      },
      {
        hostname: 'cdn.peekalink.io',
      },
    ],
  },
}

module.exports = nextConfig
