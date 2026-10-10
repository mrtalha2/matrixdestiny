import { getEsArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getEsArticleBySlug("money-blocks-in-destiny-matrix");
export default article;
