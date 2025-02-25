const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const createFetchPostsQuery = () => `
  query ProfileGalleryWebCreatedQuery(  $profileId: String!  $chainIds: [Int!]) {  profile(identifier: $profileId) {    __typename    ...ProfileGalleryGrid_profileZoraPosts_2PcsgU    id  }}fragment MediaRenderer_media on IGraphQLMedia {  __isIGraphQLMedia: __typename  __typename  mimeType  originalUri  downloadableUri  previewImage {    __typename    mimeType    downloadableUri    height    width    blurhash  }}fragment MintProgress_token on GraphQLZora1155Token {  createdAt  totalTokenMints  salesStrategy {    __typename    sale {      __typename      ... on GraphQLTimedSale {        currentMarketEth        minimumMarketEth        marketCountdown      }    }  }}fragment ProfileGalleryGridItem_post on IGraphQLPostBase {  __isIGraphQLPostBase: __typename  id  __typename  name  address  chainId  ... on IGraphQLToken {    __isIGraphQLToken: __typename    tokenId  }  mediaContent {    __typename    ...MediaRenderer_media  }  ...ProfileGalleryPostStats_post}fragment ProfileGalleryGridItem_profile on IGraphQLProfile {  __isIGraphQLProfile: __typename  ... on GraphQLAccountProfile {    publicWallet {      walletAddress      id    }  }  ... on GraphQLWalletProfile {    walletAddress  }  vcFollowingStatus}fragment ProfileGalleryGrid_profileZoraPosts_2PcsgU on IGraphQLProfile {  __isIGraphQLProfile: __typename  profileZoraPosts(listType: CREATED, chainIds: $chainIds, first: 12) {    edges {      junction {        __typename        ... on GraphQLProfileToZora20TokenJunction {          ownedCount        }      }      node {        __typename        ...ProfileGalleryGridItem_post        media {          __typename          mimeType        }        id      }      cursor    }    pageInfo {      endCursor      hasNextPage    }  }  ...ProfileGalleryGridItem_profile  id}fragment ProfileGalleryPostStats_post on IGraphQLPostBase {  __isIGraphQLPostBase: __typename  chainId  address  zoraComments {    count  }  ... on IGraphQLToken {    __isIGraphQLToken: __typename    tokenId  }  ... on GraphQLZora20Token {    __typename    id    uniqueHolders  }  ... on GraphQLZora1155Token {    __typename    salesStrategy {      __typename      ... on GraphQLZoraSaleStrategyUniswapV3Secondary {        __typename        sale {          price {            tokenPrice          }        }      }      ... on GraphQLZoraSaleStrategyZoraTimedMinter {        __typename        sale {          endTime          minimumMarketEth          marketCountdown          currentMarketEth        }      }    }    totalTokenMints    ...MintProgress_token  }}
`

export const fetchZoraPostsData = async (retries = 3, initialDelay = 1000) => {
  const query = createFetchPostsQuery()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const executeRequest = async (delay: number): Promise<any> => {
    await wait(delay)

    try {
      const results = await fetch('https://api.zora.co/universal/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { profileId: 'xcelencia', chainIds: null, after: null },
        }),
      })

      if (results.status === 429) {
        const retryAfter = results.headers.get('Retry-After')
        const retryDelay = retryAfter ? parseInt(retryAfter) * 1000 : delay * 2

        if (retries > 0) {
          console.error(`Rate limited. Retrying in ${retryDelay}ms...`)
          return executeRequest(retryDelay)
        } else {
          throw new Error('Rate limit exceeded. Max retries reached.')
        }
      }

      if (!results.ok) {
        throw new Error(`HTTP error! status: ${results.status}`)
      }

      const allData = await results.json()

      if (allData.errors) {
        throw new Error(allData.errors[0].message)
      }

      if (!allData.data || !allData.data.profile) {
        throw new Error('Unexpected API response structure')
      }

      return allData.data.profile.profileZoraPosts.edges
    } catch (error) {
      if (retries > 0) {
        console.log(`Error occurred. Retrying in ${delay}ms...`)
        return executeRequest(delay * 2)
      } else {
        throw error
      }
    }
  }

  try {
    const posts = await executeRequest(initialDelay)
    return posts.map((post) => ({
      tokenContract: post.node.address,
      chainId: post.node.chainId,
      media: post.node.mediaContent.downloadableUri,
      tokenId: post.node.tokenId,
      name: post.node.name,
      mimeType: post.node.media.mimeType,
      preview: post.node.mediaContent.previewImage.downloadableUri,
      blurhash: post.node.mediaContent.previewImage.blurhash,
    }))
  } catch (error) {
    console.error('Error in fetchTokenData:', error)
    throw error
  }
}
