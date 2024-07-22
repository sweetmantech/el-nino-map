import Image from 'next/image';

const LandingPage = () => (
  <div
    className="bg-center bg-cover bg-[url('/images/home.jpg')] bg-center
  flex justify-center items-center w-full h-full"
  >
    <div className="relative h-full aspect-[836/870]">
      <Image
        src="/images/space-station.png"
        alt=""
        className="absolute left-0 top-0 size-full"
        layout="fill"
      />
    </div>
  </div>
);

export default LandingPage;
