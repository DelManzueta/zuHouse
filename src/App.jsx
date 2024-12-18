import PlaylistPlayer from './components/PlaylistPlayer/PlaylistPlayer';
import SpotifySearch from './components/SpotifySearch/SpotifySearch';
import './styles/root.css';

function App() {
	return (
		<div className='App'>
			<PlaylistPlayer />
			<SpotifySearch />
		</div>
	);
}

export default App;
