import usePosts from '@/hooks/usePosts'
import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardFooter } from '../ui/card'
import { CollectionMetadata } from '@/lib/viem/getMetadata'
import getIpfsLink from '@/lib/getIpfsLink'

const InventoryPage = () => {
  const { data: posts, isLoading, isPending, error } = usePosts()

  if (error) return <p className="text-[red] font-titilliumweb">Failed to fetch collections.</p>

  return (
    <main className="container grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen py-24 px-10 md:px-20">
      {isLoading || isPending ? (
        <>
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton className="col-span-1 aspect-[1/1]" key={i} />
          ))}
        </>
      ) : (
        <>
          {posts.map((p: CollectionMetadata, i) => (
            <Card className="bg-slate-900" key={i}>
              <CardContent className="p-3">
                <div className="aspect-video relative bg-slate-800 rounded-lg flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getIpfsLink(p.image)}
                    alt="not found preview"
                    className="size-full object-cover"
                  />
                </div>
              </CardContent>
              <CardFooter className="!p-3">
                <p className="font-titilliumweb text-left text-white">{p.name}</p>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </main>
  )
}

export default InventoryPage
