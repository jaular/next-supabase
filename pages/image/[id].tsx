import Link from "next/link";
import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Container } from "components";
import { createClient } from "@supabase/supabase-js";
import { ImageProps } from "lib/types";

import type { ParsedUrlQuery } from "querystring";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

type Props = {
  image: ImageProps;
};

interface Query extends ParsedUrlQuery {
  id: string;
}

const ImagePage: NextPage<Props> = ({ image }) => {
  return (
    <Container title="Next.js with Supabase">
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

export const getStaticPaths = async () => {
  const { data } = await supabaseAdmin.from("images").select("*").order("id");

  const paths = data?.map((item) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = "" } = params as { id: string };

  const { data } = await supabaseAdmin
    .from("images")
    .select("*")
    .eq("id", `${id}`)
    .limit(1)
    .single();

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      image: data,
    },
  };
};

export default ImagePage;
