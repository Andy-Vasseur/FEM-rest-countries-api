import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

// Icons
import { PiMagnifyingGlassBold } from 'react-icons/pi';

// Data
import allData from '../data/data.json';

function Homepage() {
    const data = allData;
    const [selectedRegion, setSelectedRegion] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        console.log(selectedRegion);
    }, [selectedRegion]);

    const handleRegionChange = (selectedOption) => {
        setSelectedRegion(selectedOption.value);
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
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            padding: '0 1rem',
                            width: 210,
                            height: 50,
                            color: 'hsl(0, 0%, 52%)',
                            border: 'none',
                            borderRadius: 5,
                            fontSize: '.9rem',
                            fontWeight: 600,
                            fontFamily: 'Nunito Sans, sans-serif',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                            backgroundColor: 'hsl(0, 0%, 100%)',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            color: state.isSelected ? 'hsl(0, 0%, 100%)' : 'hsl(200, 15%, 8%)',
                            backgroundColor: state.isSelected ? 'hsl(0, 0%, 52%)' : 'hsl(0, 0%, 100%)',
                            '&:hover': {
                                cursor: 'pointer',
                                color: 'hsl(0, 0%, 100%)',
                                backgroundColor: 'hsl(0, 0%, 52%)',
                            },
                        }),
                    }}
                    options={regionOptions}
                    onChange={handleRegionChange}
                    placeholder="Filter by Region"
                />

            </div>
            <div className="Homepage-main">
                <ul className="Homepage-main-countries">
                    {filteredCountries.length === 0 ? (
                        <h1 className="Homepage-main-countries-not-found">No countries was found...</h1>
                    ) : (
                        filteredCountries.map((country, index) => (
                            <Link to={`/countries/${country.alpha3Code}`} className="Country-card" key={index}>
                                <img className='Country-card-flag' src={country.flag} alt={country.name} />
                                <div className="Country-card-content">
                                    <h2 className='Country-card-content-name'>{country.name}</h2>
                                    <p className='Country-card-content-population'><strong>Population:</strong> {country.population}</p>
                                    <p className='Country-card-content-region'><strong>Region:</strong> {country.region}</p>
                                    <p className='Country-card-content-capital'><strong>Capital:</strong> {country.capital}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Homepage;
