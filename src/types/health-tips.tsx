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