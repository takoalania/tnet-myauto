import { useLocation } from "react-router-dom";
import { parseFiltersFromUrl } from "../utils/parseFiltersFromURL";

export const useURLFilters = () => {
    const location = useLocation();
    return parseFiltersFromUrl(location.search);
};