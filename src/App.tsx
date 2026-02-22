// Forward to the JavaScript App entry so the existing TypeScript import continues to work.
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
	return (
		<div className="app-root">
			<Dashboard />
		</div>
	);
}

export default App;
