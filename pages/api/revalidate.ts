import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // try {
  //   // Regenerate our index route showing the images
  //   await res.unstable_revalidate("/");
  //   await res.unstable_revalidate(
  //     "/image/bf79509e-40ae-4965-848a-d26102ae01ad"
  //   );
  //   return res.json({ revalidated: true });
  // } catch (err) {
  //   // If there was an error, Next.js will continue
  //   // to show the last successfully generated page
  //   return res.status(500).send("Error revalidating");
  // }

  try {
    // check that body is not empty
    const body = req.body;
    if (!body) {
      res.status(400).send("Bad request (no body)");
      return;
    }

    // get the slug to revalidate from body
    const slugToRevalidate = body.slugToRevalidate;
    if (slugToRevalidate) {
      await res.unstable_revalidate(`/image/${slugToRevalidate}`);
      return res.json({ revalidated: true });
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
