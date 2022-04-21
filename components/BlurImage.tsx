import type { ImageProps } from "lib/types";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join("");
}

type Props = {
  image: ImageProps;
};

export const BlurImage = ({ image }: Props) => {
  const { username, name, imageSrc, id } = image;

  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Link href={`/image/${id}`}>
        <a className="group">
          <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-1 aspect-h-1">
            <Image
              alt={username}
              title={`Photo by ${username}`}
              src={imageSrc}
              layout="fill"
              objectFit="cover"
              className={cn(
                "group-hover:opacity-75 duration-700 ease-in-out",
                isLoading ? "grayscale blur-2xl" : "grayscale-0 blur-0"
              )}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <h3 className="mt-4 text-base text-gray-700">{name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{username}</p>
        </a>
      </Link>
    </>
  );
};
