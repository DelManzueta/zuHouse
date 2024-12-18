import { useEffect, useRef, useState } from 'react';
import { getAccessToken } from '../../services/spotify';
import { PLAYLIST_IDS } from '../../keys'; // Import playlist IDs
import './playlistPlayer.module.css';

const PlaylistPlayer = () => {
	const [currentTrack, setCurrentTrack] = useState(null);
	const [isMuted, setIsMuted] = useState(false);
	const audioRef = useRef(null);

	// Fetch tracks and pick a random one
	useEffect(() => {
		const fetchRandomTrack = async () => {
			const token = await getAccessToken();

			// Fetch tracks for all playlists
			const promises = PLAYLIST_IDS.map(async (id) => {
				const response = await fetch(
					`https://api.spotify.com/v1/playlists/${id}/tracks`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				return data.items
					.filter((item) => item.track.preview_url) // Only tracks with preview URLs
					.map((item) => ({
						id: item.track.id,
						name: item.track.name,
						artist: item.track.artists[0]?.name || 'Unknown Artist',
						preview_url: item.track.preview_url,
					}));
			});

			const tracks = (await Promise.all(promises)).flat();

			// Pick a random track
			if (tracks.length > 0) {
				const randomTrack =
					tracks[Math.floor(Math.random() * tracks.length)];
				setCurrentTrack(randomTrack);
			}
		};

		fetchRandomTrack();
	}, []);

	const toggleMute = () => {
		setIsMuted(!isMuted);
	};

	return (
		<div className='playlistPlayer'>
			<h1>Welcome to zuHouse</h1>
			<h2>Now Playing</h2>

			{currentTrack ? (
				<div>
					<p>
						{currentTrack.name} by {currentTrack.artist}
					</p>
					<button onClick={toggleMute}>
						{isMuted ? '🔇 Unmute' : '🔊 Mute'}
					</button>
					<audio
						ref={audioRef}
						src={currentTrack.preview_url}
						autoPlay
						muted={isMuted}
						controls
					/>
				</div>
			) : (
				<p>Loading a random track...</p>
			)}
		</div>
	);
};

export default PlaylistPlayer;
