import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("money-and-love-balance-destiny-matrix");
export default article;
