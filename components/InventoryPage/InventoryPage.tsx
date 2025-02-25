import usePosts, { ZoraPost } from '@/hooks/usePosts'
import { Skeleton } from '../ui/skeleton'
import Image from 'next/image'

const InventoryPage = () => {
  const { data: posts, isLoading } = usePosts()

  return (
    <main className="container grid grid-cols-3 min-h-screen gap-10 gap-2 p-20">
      {isLoading ? (
        <>
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton className="col-span-1 aspect-[1/1]" key={i} />
          ))}
        </>
      ) : (
        <>
          {posts.map((p: ZoraPost, i) => (
            <div className="col-span-1 aspect-1/1 flex flex-col items-center" key={i}>
              <div className="h-2/3 w-full relative overflow-hidden">
                <Image
                  src={p.preview}
                  layout="fill"
                  alt="not found preview"
                  objectFit="cover"
                  objectPosition="center"
                  blurDataURL={p.blurhash}
                />
              </div>
              <p className="font-titilliumweb">{p.name}</p>
            </div>
          ))}
        </>
      )}
    </main>
  )
}

export default InventoryPage
