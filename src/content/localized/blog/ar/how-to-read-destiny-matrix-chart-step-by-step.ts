import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("how-to-read-destiny-matrix-chart-step-by-step");
export default article;
