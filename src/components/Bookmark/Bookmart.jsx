import Map from "../Map/Map"

function Bookmart() {
    return (
        <div className="appLayout">
            <div className="sidebar">
                {/* <Outlet /> */}
                <div>book mark list</div>
            </div>
            <div className="mapContainer"><Map markerLocations={[]}/></div>
        </div>
    )
}

export default Bookmart