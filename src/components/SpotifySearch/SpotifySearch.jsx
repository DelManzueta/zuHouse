import { useState } from 'react';
import { searchSpotify } from '../../services/spotify';
import './spotifySearch.module.css';

const SpotifySearch = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	const handleSearch = async () => {
		const tracks = await searchSpotify(query);
		setResults(tracks);
	};

	return (
		<div className='spotifySearch'>
			<h2>Search for a Track</h2>
			<input
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder='Search for a track'
			/>
			<button onClick={handleSearch}>Search</button>

			<ul>
				{results.map((track) => (
					<li key={track.id}>
						{track.name} by {track.artist}
						{track.preview_url && (
							<audio
								src={track.preview_url}
								controls
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SpotifySearch;
