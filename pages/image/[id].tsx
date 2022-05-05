import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { ImageProps } from "lib/types";
import Link from "next/link";
import { Container } from "components";
import { getAllImagesId, getImageById } from "lib/db";

type Props = {
  image: ImageProps;
};

const ImagePage: NextPage<Props> = ({ image }) => {
  return (
    <Container title="Next.js | SSG">
      <div className="space-y-4">
        <h1 className="text-base text-gray-700">
          Photo by{" "}
          <span className="font-medium text-gray-900">{image.name}</span>
        </h1>
        <div>
          <a
            className="text-base text-blue-500 underline"
            href={image.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image.href}
          </a>
        </div>
        <p className="text-base text-gray-700">
          ID: <span className="font-medium text-gray-900">{image.id}</span>
        </p>
        <div>
          <Link href="/">
            <a className="text-base text-blue-500 underline">Back</a>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getAllImagesId();

  const paths = result.map((item) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = "" } = params as { id: string };
  const result = await getImageById(id);

  if (!result) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      image: result,
    },
  };
};

// SSR

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { id = "" } = params as { id: string };
//   const result = await getImageById(id);

//   if (!result) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       image: result,
//     },
//   };
// };

export default ImagePage;
