// Data
import allData from '../data/data.json';

function Country() {

    const alpha3code = window.location.pathname.split("/")[2]
    console.log(alpha3code)

    const country = allData.find((country) => country.alpha3Code === alpha3code)
    console.log(country)

    return (
        <div className="Country">
            <h1>
                {country.name}
            </h1>
        </div>
    )
}

export default Country