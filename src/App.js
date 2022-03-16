import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import Content from "./components/sections/Content";
import Footer from "./components/sections/Footer";
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    <Container className="App">
      <Row>
        <Content />
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default App;
