export type HealthTipSection = {
  heading: string;
  body: string;
};

export type HealthTip = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  sections: HealthTipSection[];
};

export interface IHealthTip {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string ;
  content: string;
  authorId: string;
  icon: string ;
  isPublished: boolean;
  views: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: Date;
}

export interface IHealthTipFilter {
  searchTerm?: string;
  category?: string;
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
}
