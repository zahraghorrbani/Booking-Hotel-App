import { createContext, useContext } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelContext = createContext();

function HotelsProvider({ children }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.stringify(searchParams.get("options"))?.room;
    const { isloading, data: hotels } = useFetch("http://localhost:5000/hotels",
        `q=${destination || ""}&accommodates_gte=${room || 1}`)

    return (
        <HotelContext.Provider value={{ isloading, hotels }}>{children}</HotelContext.Provider>
    )
}

export default HotelsProvider;

export function useHotels() {
    return useContext(HotelContext);
}