import './App.css';
import { LogIn } from './Pages/LogIn';
import { Welcome } from './Componants/Welcome';
import { AuthProvider } from './Contaxts/AuthContext';
import { HomePage } from './Pages/HomePage';

function App() {
  return (

    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}

export default App;
