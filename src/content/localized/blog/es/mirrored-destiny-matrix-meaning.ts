import { getEsArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getEsArticleBySlug("mirrored-destiny-matrix-meaning");
export default article;
