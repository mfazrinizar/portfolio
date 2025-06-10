export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl?: string;
  images?: { url: string; alt: string }[];
  projectUrl?: string;
  githubUrl?: string;
  detailsUrl?: string;
  tags: string[];
  keywords?: string[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  imageUrl?: string;
  tags?: string[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};
