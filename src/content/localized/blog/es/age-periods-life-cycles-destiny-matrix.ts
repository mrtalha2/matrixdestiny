import { getEsArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getEsArticleBySlug("age-periods-life-cycles-destiny-matrix");
export default article;
