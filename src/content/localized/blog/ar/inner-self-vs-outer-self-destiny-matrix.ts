import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("inner-self-vs-outer-self-destiny-matrix");
export default article;
