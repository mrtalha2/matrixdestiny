import { getPtBrArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getPtBrArticleBySlug("ancestral-lines-destiny-matrix");
export default article;
