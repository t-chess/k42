import './App.css'
import Table from './components/Table'
import { useTable } from './hooks/useTable'

function App() {
  const { data } = useTable();
  return <Table data={data} level={0} />
}

export default App
