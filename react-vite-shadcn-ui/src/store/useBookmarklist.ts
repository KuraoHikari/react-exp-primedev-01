import { animeBookmark } from "@/types/responseType";
import { create } from "zustand";

interface BookmarkStore {
 bookmarks: animeBookmark[];
 add: (id: animeBookmark) => void;
 remove: (id: number) => void;
 set: (id: animeBookmark[]) => void;
}

const useBookmarksList = create<BookmarkStore>((set) => ({
 bookmarks: [],
 add: (bookmark) => set((state) => ({ bookmarks: [bookmark, ...state.bookmarks] })),
 remove: (malId) => set((state) => ({ bookmarks: state.bookmarks.filter((bookmark) => bookmark.malId !== malId) })),
 set: (bookmarks) => set({ bookmarks: bookmarks }),
}));

export default useBookmarksList;
