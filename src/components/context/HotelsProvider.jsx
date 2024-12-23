import { createContext, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

function HotelsProvider({ children }) {
    const [currentHotel, setCurrentHotel] = useState({});
    const [isloadingCurrentHotel, setIsloadingCurrentHotel] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.stringify(searchParams.get("options"))?.room;

    const { isloading, data: hotels } = useFetch(BASE_URL,
        `q=${destination || ""}&accommodates_gte=${room || 1}`)

    async function getHotel(id) {
        setIsloadingCurrentHotel(true);
        try {
            const { data } = await axios.get(`${BASE_URL}/${id}`);
            setCurrentHotel(data);
            setIsloadingCurrentHotel(false);
        }
        catch (err) {
            toast.error(err.message)
            setIsloadingCurrentHotel(false);
        }
    }

    return (
        <HotelContext.Provider value={{ isloading, hotels, getHotel, isloadingCurrentHotel, currentHotel }}>{children}</HotelContext.Provider>
    )
}

export default HotelsProvider;

export function useHotels() {
    return useContext(HotelContext);
}