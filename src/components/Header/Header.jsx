import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/outSideClick";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [destination, setDestination] = useState(searchParams.get("destination") || "0");
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
    const [date, setDate] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }]);
    const [openDate, setOpenDate] = useState(false);
    const navigate = useNavigate();
    const handleOptions = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === "inc" ? options[name] + 1 : options[name] - 1
            }
        }
        );
    }

    const handleSearch = () => {
        const encodedParams = createSearchParams({
            date: JSON.stringify(date),
            destination,
            options: JSON.stringify(options)
        })
        navigate({ pathname: "/hotels", search: encodedParams.toString() });
    }
    return (
        <div className="header">
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationOn className="headerIcon locationIcon" />
                    <input value={destination} onChange={e => setDestination(e.target.value)} type="text" placeholder="where to go?" className="headerSearchInput" name="destination" id="destination" />
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <HiCalendar className="headerIcon dateIcon" />
                    <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</div>
                    {openDate && <DateRange ranges={date} className="date" onChange={(item) => setDate([item.selection])} minDate={new Date()} moveRangeOnFirstSelection={true} />}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
                        {options.adult} adult &bull; {options.children} children &bull; {options.room} room
                    </div>
                    {
                        openOptions && <GuestOptionList options={options} handleOptions={handleOptions} setOpenOptions={setOpenOptions} />
                    }
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className="headerSearchBtn" onClick={handleSearch}>
                        <HiSearch className="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOptions }) {
    const optionRef = useRef();
    useOutsideClick(optionRef, "optionDropDown", () => setOpenOptions(false));
    let optionItem = [{ type: "adult", minLimit: 1 }, { type: "children", minLimit: 0 }, { type: "room", minLimit: 1 }];
    return <div className="guestOptions" ref={optionRef}>
        {
            optionItem.map((item) => {
                return <OptionItem key={item.type} type={item.type} options={options} minLimit={item.minLimit} handleOptions={handleOptions} />
            })
        }
    </div>
}

function OptionItem({ type, options, minLimit, handleOptions }) {
    return (
        <div className="guestOptionItem">
            <span className="optionText">{type}</span>
            <div className="optionCounter">
                <button onClick={() => handleOptions(type, "dec")} className="optionCounterBtn" disabled={options[type] <= minLimit}>
                    <HiMinus className="icon" />
                </button>
                <span className="optionCounterNumber">{options[type]}</span>
                <button onClick={() => handleOptions(type, "inc")} className="optionCounterBtn">
                    <HiPlus className="icon" />
                </button>
            </div>
        </div>
    )
}