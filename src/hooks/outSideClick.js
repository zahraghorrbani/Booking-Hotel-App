import { useEffect } from "react"

export default function useOutsideClick(ref, execeptionId, cb) {
    useEffect(() => {
        function handleOutesideClick(event) {
            if (ref.current && !ref.current.contains(event.target) && event.target.id !== execeptionId) {
                cb();
            }
        }
        document.addEventListener("mousedown", handleOutesideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutesideClick)
        };
    }, [ref, cb])
}