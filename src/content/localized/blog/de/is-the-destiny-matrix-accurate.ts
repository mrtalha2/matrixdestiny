import { getDeArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getDeArticleBySlug("is-the-destiny-matrix-accurate");
export default article;
