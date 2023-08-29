import { useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import allData from '../data/data.json';
import Return2Top from '../components/Return2Top';

function Homepage() {
    const data = allData;
    const [selectedRegion, setSelectedRegion] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const handleRegionChange = (selectedOption) => {
        setSelectedRegion(selectedOption.value);
        setCurrentPage(1);
    };

    const regionOptions = [
        { value: '', label: 'Show All' },
        ...Array.from(new Set(data.map((country) => country.region))).map((region) => ({
            value: region,
            label: region,
        }))
    ];

    const filteredCountries = data.filter((country) => {
        const regionMatches = !selectedRegion || country.region === selectedRegion;
        const nameMatches = country.name.toLowerCase().includes(searchQuery.toLowerCase());
        return regionMatches && nameMatches;
    });

    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const totalPageCount = Math.ceil(filteredCountries.length / itemsPerPage);
    const indexOfLastCountry = currentPage * itemsPerPage;
    const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
    const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="Homepage">
            <div className="Homepage-header">
                <div className='Homepage-header-countries-input'>
                    <span>
                        <PiMagnifyingGlassBold />
                    </span>
                    <input
                        type="text"
                        name="searchInput"
                        placeholder="Search for a country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select
                    className='Homepage-header-region-select'
                    options={regionOptions}
                    onChange={handleRegionChange}
                    placeholder="Filter by Region"
                    value={regionOptions.find((option) => option.value === selectedRegion)}
                    styles={{
                        control: (styles) => ({
                            ...styles,
                            cursor: 'pointer',
                            width: '125px'
                        })
                    }}
                />
            </div>
            <div className="Homepage-main">
                <ul className="Homepage-main-countries">
                    {currentCountries.length === 0 ? (
                        <h1 className="Homepage-main-countries-not-found">No countries were found...</h1>
                    ) : (
                        currentCountries.map((country, index) => (
                            <li key={index}>
                                <Link to={`/countries/${country.alpha3Code}`} className="Country-card" rel='preload'>
                                    <img
                                        className='Country-card-flag'
                                        srcSet={country.flag}
                                        alt={country.name}
                                        loading='lazy'
                                    />
                                    <div className="Country-card-content">
                                        <h2 className='Country-card-content-name'>{country.name}</h2>
                                        <p className='Country-card-content-population'><strong>Population:</strong> {country.population ? addCommasToNumber(country.population) : 'N/A'}</p>
                                        <p className='Country-card-content-region'><strong>Region:</strong> {country.region}</p>
                                        <p className='Country-card-content-capital'><strong>Capital:</strong> {country.capital}</p>
                                    </div>
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
                <div className="Pagination">
                    {Array.from({ length: totalPageCount }, (_, index) => (
                        <button
                            key={index}
                            className={`Pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <Return2Top />
            </div>
        </div>
    );
}

export default Homepage;
