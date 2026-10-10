import { getIdArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getIdArticleBySlug("inner-self-vs-outer-self-destiny-matrix");
export default article;
