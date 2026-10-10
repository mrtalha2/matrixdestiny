import { getDeArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getDeArticleBySlug("why-destiny-matrix-calculators-give-different-numbers");
export default article;
