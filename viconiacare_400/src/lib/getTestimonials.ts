import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Testimonial } from "@/types/testimonial";

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "testimonials",
    where: { published: { equals: true } },
    sort: "-createdAt",
    limit: 6,
    depth: 1,
  });

  return result.docs.map((doc) => ({
    id: String(doc.id),
    familyName: doc.name,
    statement: doc.quote as string,
    rating: doc.rating ?? 5,
    location: null,
    avatarInitials: null,
    avatar: null,
  }));
}
