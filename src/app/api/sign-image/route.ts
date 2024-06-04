// name and path have to be exact

import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  if (!process.env?.["CLOUDINARY_API_SECRET"]) {
    throw new Error("No API secret env key");
  }

  const signature = cloudinary.v2.utils.api_sign_request(
    paramsToSign,
    process.env?.["CLOUDINARY_API_SECRET"]
  );
  return Response.json({ signature });
}
