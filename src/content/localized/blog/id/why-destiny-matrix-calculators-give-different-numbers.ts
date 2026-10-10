import { getIdArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getIdArticleBySlug("why-destiny-matrix-calculators-give-different-numbers");
export default article;
