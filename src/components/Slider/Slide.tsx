import Image from "next/image";

interface SlideProps {
  src: string;
  alt: string;
  priority?: boolean;
}

const Slide = ({ src, alt, priority = false }: SlideProps) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
};

export default Slide;
