import { getEsArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getEsArticleBySlug("chakra-table-destiny-matrix-guide");
export default article;
