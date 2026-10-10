import { getIdArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getIdArticleBySlug("parent-child-balance-destiny-matrix");
export default article;
