import { getIdArticleBySlug } from "./index";
import { BlogPost } from "@/content/blog/types";

export const article: BlogPost | undefined = getIdArticleBySlug("chakra-table-destiny-matrix-guide");
export default article;
