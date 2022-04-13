import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.REVALIDATE_SECRET) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  try {
    const id = JSON.parse(req.body)?.parameters?.id;
    if (id) {
      await res.unstable_revalidate(`/image/${id}`);
    }
    // Regenerate our index route showing the images
    console.log("[Next.js] Revalidating /");
    await res.unstable_revalidate("/");

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
