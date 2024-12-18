import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

let accessToken = '';

export const getAccessToken = async () => {
	if (!accessToken) {
		const response = await axios.post(
			'https://accounts.spotify.com/api/token',
			new URLSearchParams({ grant_type: 'client_credentials' }),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${btoa(
						`${CLIENT_ID}:${CLIENT_SECRET}`
					)}`,
				},
			}
		);
		accessToken = response.data.access_token;
	}
	return accessToken;
};

// Export searchSpotify function
export const searchSpotify = async (query) => {
	const token = await getAccessToken();
	const response = await axios.get(
		`https://api.spotify.com/v1/search?q=${encodeURIComponent(
			query
		)}&type=track`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return response.data.tracks.items.map((item) => ({
		id: item.id,
		name: item.name,
		artist: item.artists[0]?.name || 'Unknown Artist',
		preview_url: item.preview_url,
	}));
};
