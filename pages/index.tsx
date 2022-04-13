import type { GetStaticProps, NextPage } from "next";
import type { ImageProps } from "lib/types";
import { Container, Grid } from "components";
import { getAllImages } from "lib/db";

type Props = {
  images: ImageProps[];
};

const Home: NextPage<Props> = ({ images }) => {
  return (
    <Container title="Next.js | On-demand ISR">
      <Grid images={images} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // getStaticProps with On-demand ISR (Beta)
  const result = await getAllImages();

  return {
    props: {
      images: result,
    },
  };
};

export default Home;
