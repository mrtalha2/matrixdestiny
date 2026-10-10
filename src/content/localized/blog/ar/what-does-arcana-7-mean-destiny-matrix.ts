import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("what-does-arcana-7-mean-destiny-matrix");
export default article;
