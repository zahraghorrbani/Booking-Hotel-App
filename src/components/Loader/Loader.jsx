import { LoaderIcon } from "react-hot-toast"

function Loader() {
    return (
        <div
            style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                margin: "1rem auto"
            }}
        >
            <p>Loading Data...</p>
            <LoaderIcon style={{ width: "1.3rem" }} />
        </div>
    )
}

export default Loader