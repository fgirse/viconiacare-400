export interface Testimonial {
  id: string;
  familyName: string;
  statement: string;
  rating: number;
  location?: string | null;
  avatarInitials?: string | null;
  avatar?: { url: string } | null;
}
