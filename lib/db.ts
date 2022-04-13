import { createClient } from "@supabase/supabase-js";
import { ImageProps } from "lib/types";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export const getAllImages = async (): Promise<ImageProps[]> => {
  const { data } = await supabaseAdmin
    .from<ImageProps>("images")
    .select("*")
    .order("created_at");

  return JSON.parse(JSON.stringify(data));
};

export const getImageById = async (id: string): Promise<ImageProps | null> => {
  const { data } = await supabaseAdmin
    .from<ImageProps>("images")
    .select("*")
    .eq("id", `${id}`)
    .limit(1)
    .single();

  if (!data) {
    return null;
  }

  return JSON.parse(JSON.stringify(data));
};
