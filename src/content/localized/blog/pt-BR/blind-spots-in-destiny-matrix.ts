import { getPtBrArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getPtBrArticleBySlug("blind-spots-in-destiny-matrix");
export default article;
