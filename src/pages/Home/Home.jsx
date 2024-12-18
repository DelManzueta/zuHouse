import SpotifySearch from '../../components/SpotifySearch/SpotifySearch';
import './home.module.css';

const Home = () => {
	return (
		<div className='home'>
			<h1>Welcome to zuHouse</h1>
			<SpotifySearch />
		</div>
	);
};

export default Home;
