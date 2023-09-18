export interface Comment {
  id: number;
  property_id: number;
  content: string;
}

export interface CommentInfo {
  comments: Comment[];
  count: number;
}
