import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("parent-child-balance-destiny-matrix");
export default article;
