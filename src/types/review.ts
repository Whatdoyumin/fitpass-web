export type TReview = {
  id: number;
  content: string;
  score: number;
  createdAt: string;
  updatedAt?: string;
  isOwner?: boolean;
}