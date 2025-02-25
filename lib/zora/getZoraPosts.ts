const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const createFetchPostsQuery = () => `
  query ProfileGalleryGridPaginationQuery( $chainIds: [Int!]  $cursor: String  $first: Int = 12  $listType: EProfileListType = CREATED  $id: ID!) {  node(id: $id) {    __typename    ...ProfileGalleryGrid_profileZoraPosts_RQWMC    id  }}fragment MediaRenderer_media on IGraphQLMedia {  __isIGraphQLMedia: __typename  __typename  mimeType  originalUri  downloadableUri  previewImage {    __typename    mimeType    downloadableUri    height    width    blurhash  }}fragment MintProgress_token on GraphQLZora1155Token {  createdAt  totalTokenMints  salesStrategy {    __typename    sale {      __typename      ... on GraphQLTimedSale {        currentMarketEth        minimumMarketEth        marketCountdown      }    }  }}fragment ProfileGalleryGridItem_post on IGraphQLPostBase {  __isIGraphQLPostBase: __typename  id  __typename  name  address  chainId  ... on IGraphQLToken {    __isIGraphQLToken: __typename    tokenId  }  mediaContent {    __typename    ...MediaRenderer_media  }  ...ProfileGalleryPostStats_post}fragment ProfileGalleryGridItem_profile on IGraphQLProfile {  __isIGraphQLProfile: __typename  ... on GraphQLAccountProfile {    publicWallet {      walletAddress      id    }  }  ... on GraphQLWalletProfile {    walletAddress  }  vcFollowingStatus}fragment ProfileGalleryGrid_profileZoraPosts_RQWMC on IGraphQLProfile {  __isIGraphQLProfile: __typename  profileZoraPosts(listType: $listType, chainIds: $chainIds, first: $first, after: $cursor) {    edges {      junction {        __typename        ... on GraphQLProfileToZora20TokenJunction {          ownedCount        }      }      node {        __typename        ...ProfileGalleryGridItem_post        media {          __typename          mimeType        }        id      }      cursor    }    pageInfo {      endCursor      hasNextPage    }  }  ...ProfileGalleryGridItem_profile  id}fragment ProfileGalleryPostStats_post on IGraphQLPostBase {  __isIGraphQLPostBase: __typename  chainId  address  zoraComments {    count  }  ... on IGraphQLToken {    __isIGraphQLToken: __typename    tokenId  }  ... on GraphQLZora20Token {    __typename    id    uniqueHolders  }  ... on GraphQLZora1155Token {    __typename    salesStrategy {      __typename      ... on GraphQLZoraSaleStrategyUniswapV3Secondary {        __typename        sale {          price {            tokenPrice          }        }      }      ... on GraphQLZoraSaleStrategyZoraTimedMinter {        __typename        sale {          endTime          minimumMarketEth          marketCountdown          currentMarketEth        }      }    }    totalTokenMints    ...MintProgress_token  }}
`
export const createIntitialFetchPostsQuery = () => `
  query ProfileGalleryWebCreatedQuery(  $profileId: String!  $chainIds: [Int!]) {  profile(identifier: $profileId) {    __typename    ...ProfileGalleryGrid_profileZoraPosts_2PcsgU    id  }}fragment MediaRenderer_media on IGraphQLMedia {  __isIGraphQLMedia: __typename  __typename  mimeType  originalUri  downloadableUri  previewImage {    __typename    mimeType    downloadableUri    height    width    blurhash  }}fragment MintProgress_token on GraphQLZora1155Token {  createdAt  totalTokenMints  salesStrategy {    __typename    sale {      __typename      ... on GraphQLTimedSale {        currentMarketEth        minimumMarketEth        marketCountdown      }    }  }}fragment ProfileGalleryGridItem_post on IGraphQLPostBase {  __isIGraphQLPostBase: __typename  id  __typename  name  address  chainId  ... on IGraphQLToken {    __isIGraphQLToken: __typename    tokenId  }  mediaContent {    __typename    ...MediaRenderer_media  }  ...ProfileGalleryPostStats_post}fragment ProfileGalleryGridItem_profile on IGraphQLProfile {  __isIGraphQLProfile: __typename  ... on GraphQLAccountProfile {    publicWallet {      walletAddress      id    }  }  ... on GraphQLWalletProfile {    walletAddress  }  vcFollowingStatus}fragment ProfileGalleryGrid_profileZoraPosts_2PcsgU on IGraphQLProfile {  __isIGraphQLProfile: __typename  profileZoraPosts(listType: CREATED, chainIds: $chainIds, first: 12) {    edges {      junction {        __typename        ... on GraphQLProfileToZora20TokenJunction {          ownedCount        }      }      node {        __typename        ...ProfileGalleryGridItem_post        media {          __typename          mimeType        }        id      }      cursor    }    pageInfo {      endCursor      hasNextPage    }  }  ...ProfileGalleryGridItem_profile  id}fragment ProfileGalleryPostStats_post on IGraphQLPostBase {  __isIGraphQLPostBase: __typename  chainId  address  zoraComments {    count  }  ... on IGraphQLToken {    __isIGraphQLToken: __typename    tokenId  }  ... on GraphQLZora20Token {    __typename    id    uniqueHolders  }  ... on GraphQLZora1155Token {    __typename    salesStrategy {      __typename      ... on GraphQLZoraSaleStrategyUniswapV3Secondary {        __typename        sale {          price {            tokenPrice          }        }      }      ... on GraphQLZoraSaleStrategyZoraTimedMinter {        __typename        sale {          endTime          minimumMarketEth          marketCountdown          currentMarketEth        }      }    }    totalTokenMints    ...MintProgress_token  }}
`
export const fetchZoraPostsData = async (retries = 3, initialDelay = 1000) => {
  const executeRequest = async (delay: number, cursor: string | null = null): Promise<any[]> => {
    await wait(delay)
    const allPosts: any[] = []
    let endCursor: string | null = cursor
    let id = null

    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const query = endCursor ? createFetchPostsQuery() : createIntitialFetchPostsQuery()
        const results = await fetch('https://api.zora.co/universal/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.ZORA_API_KEY,
          },
          body: JSON.stringify({
            query,
            variables: {
              chainIds: null,
              ...(endCursor ? { cursor: endCursor, id } : { profileId: 'xcelencia' }),
            },
          }),
        })

        if (results.status === 429) {
          const retryAfter = results.headers.get('Retry-After')
          const retryDelay = retryAfter ? parseInt(retryAfter) * 1000 : delay * 2

          if (retries > 0) {
            console.error(`Rate limited. Retrying in ${retryDelay}ms...`)
            await wait(retryDelay)
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

        if (!allData.data) {
          throw new Error('Unexpected API response structure')
        }

        const profileZoraPosts = allData.data?.profile
          ? allData.data.profile.profileZoraPosts
          : allData.data.node.profileZoraPosts
        const currentPosts = profileZoraPosts.edges
        allPosts.push(...currentPosts)

        endCursor = profileZoraPosts.pageInfo.endCursor
        id = id ? allData.data.node.id : allData.data.profile.id
      }

      return allPosts
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
