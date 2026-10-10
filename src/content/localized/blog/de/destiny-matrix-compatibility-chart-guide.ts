import { getDeArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getDeArticleBySlug("destiny-matrix-compatibility-chart-guide");
export default article;
