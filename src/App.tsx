import { ThemeProvider } from './context/ThemeContext';
import FamilyTree from './components/FamilyTree';

function App() {
  return (
    <ThemeProvider>
      <FamilyTree />
    </ThemeProvider>
  );
}

export default App;
