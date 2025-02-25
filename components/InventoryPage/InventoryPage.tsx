import usePosts, { ZoraPost } from '@/hooks/usePosts'
import { Skeleton } from '../ui/skeleton'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '../ui/card'

const InventoryPage = () => {
  const { data: posts, isLoading, error } = usePosts()

  if (!error) return <p className="text-[red] font-titilliumweb">Failed to fetch collections.</p>
  
  return (
    <main className="container grid grid-cols-3 gap-4 min-h-screen py-24 px-20">
      {isLoading ? (
        <>
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton className="col-span-1 aspect-[1/1]" key={i} />
          ))}
        </>
      ) : (
        <>
          {posts.map((p: ZoraPost, i) => (
            <Card className="bg-slate-900" key={i}>
              <CardContent className="p-3">
                <div className="aspect-video relative bg-slate-800 rounded-lg flex items-center justify-center">
                  <Image
                    src={p.preview}
                    layout="fill"
                    alt="not found preview"
                    objectFit="cover"
                    objectPosition="center"
                    blurDataURL={p.blurhash}
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
