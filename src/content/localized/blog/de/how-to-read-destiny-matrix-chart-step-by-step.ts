import { getDeArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getDeArticleBySlug("how-to-read-destiny-matrix-chart-step-by-step");
export default article;
