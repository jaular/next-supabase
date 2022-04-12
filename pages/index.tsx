import type { GetStaticProps, NextPage } from "next";
import type { ImageProps } from "lib/types";
import { Container, Grid } from "components";
import { createClient } from "@supabase/supabase-js";

type Props = {
  images: ImageProps[];
};

const Home: NextPage<Props> = ({ images }) => {
  return (
    <Container title="Next.js with Supabase">
      <Grid images={images} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin
    .from("images")
    .select("*")
    .order("created_at");

  return {
    props: {
      images: data,
    },
  };
};

export default Home;
