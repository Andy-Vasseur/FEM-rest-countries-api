// Generals
import { useState } from "react"
import { Link } from "react-router-dom"

// Icons
import { FiMoon } from "react-icons/fi"

function Navigation() {

    const [isDarkMode, setIsDarkMode] = useState(false)

    const handleDarkMode = () => {
        console.log("Dark Mode")
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
                        <FiMoon />
                    </span>
                    Dark Mode
                </button>
            </div>
        </div>
    )
}

export default Navigation