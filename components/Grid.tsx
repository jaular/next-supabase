import type { ImageProps } from "lib/types";
import { BlurImage } from "components";

type Props = {
  images: ImageProps[];
};

export const Grid = ({ images }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {images.map((image) => (
        <BlurImage key={image.id} image={image} />
      ))}
    </div>
  );
};
