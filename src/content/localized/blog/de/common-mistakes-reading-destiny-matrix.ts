import { getDeArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getDeArticleBySlug("common-mistakes-reading-destiny-matrix");
export default article;
