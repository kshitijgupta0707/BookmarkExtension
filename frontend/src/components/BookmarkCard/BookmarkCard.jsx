import { useEffect } from "react";

export const BookmarkCard = ({ bookmark }) => {
    // Extract domain for favicon
    useEffect(() => {
        console.log("BookmarkCard mounted:", bookmark);
    }, []);
    const getDomain = (url) => {
        try {
            const domain = new URL(url).hostname;
            return domain;
        } catch {
            return "example.com";
        }
    };
    if (!bookmark) {
        return null;
    }

    return (
        <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-accent group"
        >
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center overflow-hidden">
                <img
                    src={`https://www.google.com/s2/favicons?domain=${getDomain(bookmark?.url)}&sz=64`}
                    alt=""
                    className="w-4 h-4"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/16/16";
                    }}
                />
            </div>
            <div className="flex-grow w-[10px]">
                <h3 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                    {bookmark?.title || "Untitled Bookmark"}
                </h3>
                <p className="text-xs text-muted-foreground truncate mt-1">
                    {bookmark?.url}
                </p>
            </div>
        </a>
    );
};