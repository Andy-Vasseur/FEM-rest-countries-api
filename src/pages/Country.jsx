import { Link } from 'react-router-dom';

// Icons
import { BsArrowLeft } from 'react-icons/bs';

// Data
import allData from '../data/data.json';

function Country() {

    const alpha3Code = window.location.pathname.split("/")[2]
    const country = allData.find((country) => country.alpha3Code === alpha3Code)

    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const bordersCountries = country.borders.map((border) => {
        const borderCountry = allData.find((country) => country.alpha3Code === border)
        return borderCountry.name
    })

    return (
        <div className="Country">
            <div className="Country-header">
                <Link to="/">
                    <span>
                        <BsArrowLeft />
                    </span>
                    Back
                </Link>
            </div>
            <div className="Country-main">
                <div className="Country-main-flag">
                    <img
                        srcSet={country.flag}
                        alt={country.name}
                        loading='lazy'
                    />
                </div>
                <div className="Country-main-infos">
                    <h1>{country.name}</h1>

                    <div className="Country-main-infos-subinfos">
                        <p>
                            <strong>Native Name:</strong>
                            {country.nativeName}
                        </p>
                        <p>
                            <strong>Population:</strong>
                            {country.population ? addCommasToNumber(country.population) : 'N/A'}
                        </p>
                        <p>
                            <strong>Region:</strong>
                            {country.region}
                        </p>
                        <p>
                            <strong>Sub Region:</strong>
                            {country.subregion}
                        </p>
                        <p>
                            <strong>Capital:</strong>
                            {country.capital}
                        </p>
                        <p>
                            <strong>Top Level Domain</strong>
                            {country.topLevelDomain}
                        </p>
                        <p>
                            <strong>Currencies:</strong>
                            {
                                !country.currencies ? (
                                    <span>None</span>
                                ) : (
                                    country.currencies.map((currency, index) => (
                                        <span key={index}>{currency.name}{index !== country.currencies.length - 1 ? ', ' : ''}</span>
                                    ))
                                )
                            }
                        </p>
                        <p>
                            <strong>Languages:</strong>
                            {
                                !country.languages ? (
                                    <span>None</span>
                                ) : (
                                    country.languages.map((language, index) => (
                                        <span key={index}>{language.name}{index !== country.languages.length - 1 ? ', ' : ''}</span>
                                    ))
                                )
                            }
                        </p>
                    </div>

                    <div className="Country-main-infos-border-countries">
                        <strong>
                            Border Countries:
                        </strong>
                        <ul>
                            {
                                !country.borders ? (
                                    <span>None</span>
                                ) : (
                                    bordersCountries.map((borderCountry, index) => (
                                        <span key={index}>{borderCountry}{index !== bordersCountries.length - 1 ? '' : ''}</span>
                                    ))
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Country