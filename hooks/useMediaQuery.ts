import { useEffect, useState } from "react";


export default function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const MediaQuery = window.matchMedia(query);
        const windowChangeHandler = () => setMatches(MediaQuery.matches);
        setMatches(MediaQuery.matches);

        MediaQuery.addEventListener('change', windowChangeHandler);
        return () => MediaQuery.removeEventListener('change', windowChangeHandler); // cleanup function
    }, [query])

    return matches
}