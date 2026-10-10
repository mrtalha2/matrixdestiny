import { getArArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getArArticleBySlug("age-periods-life-cycles-destiny-matrix");
export default article;
