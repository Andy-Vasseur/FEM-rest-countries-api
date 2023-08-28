// Generals
import { useState } from "react"
import { Link } from "react-router-dom"

// Icons
import { BiMoon, BiSolidMoon } from "react-icons/bi"

function Navigation() {

    const [isDarkMode, setIsDarkMode] = useState(false)

    const handleDarkMode = () => {
        const bodyContainsDarkClass = document.body.classList.toggle("dark")
        setIsDarkMode(bodyContainsDarkClass)
    }

    return (
        <div className="Navigation">
            <div className="Navigation-logo">
                <Link to="/">
                    Where in the world?
                </Link>
            </div>
            <div className="Navigation-theme">
                <button type="button" onClick={handleDarkMode}>
                    <span>
                        {
                            isDarkMode ?
                                <BiSolidMoon />
                                :
                                <BiMoon />

                        }
                    </span>
                    Dark Mode
                </button>
            </div>
        </div>
    )
}

export default Navigation