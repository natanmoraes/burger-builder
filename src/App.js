import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <div id="app">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
