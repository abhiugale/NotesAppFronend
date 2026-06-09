import { createContext, useContext, useState, ReactNode } from "react";
import { useDebounce } from "../../../common/hooks/useDebounce";

interface NotesFilterContextType {
  search: string;
  setSearch: (s: string) => void;
  debouncedSearch: string;
  filterType: "all" | "archived";
  setFilterType: (f: "all" | "archived") => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  order: "asc" | "desc";
  setOrder: (o: "asc" | "desc") => void;
  allTags: string[];
  setAllTags: (tags: string[]) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const NotesFilterContext = createContext<NotesFilterContextType | undefined>(undefined);

export function NotesFilterProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce<string>(search, 400);
  
  const [filterType, setFilterType] = useState<"all" | "archived">("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <NotesFilterContext.Provider
      value={{
        search,
        setSearch,
        debouncedSearch,
        filterType,
        setFilterType,
        selectedTag,
        setSelectedTag,
        sortBy,
        setSortBy,
        order,
        setOrder,
        allTags,
        setAllTags,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </NotesFilterContext.Provider>
  );
}

export function useNotesFilter() {
  const context = useContext(NotesFilterContext);
  if (context === undefined) {
    throw new Error("useNotesFilter must be used within a NotesFilterProvider");
  }
  return context;
}
