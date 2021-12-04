import "./App.css";
import PagesContent from "./route";
import { Layout } from "antd";

function App() {
  return (
    <Layout style={{ background: "#fff" }}>
      <PagesContent />
    </Layout>
  );
}

export default App;
