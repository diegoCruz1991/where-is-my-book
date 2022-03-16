import { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onSubmit(event) {
    const { onSearch } = this.props;

    console.info(`Searching for ${this.state.value}`);

    event.preventDefault();

    onSearch(this.state.value);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="searchForm">
          <Form.Label column sm="2">
            Search:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="Search authors"
            />
          </Col>
          <Col sm="2">
            <Button variant="primary" type="submit">
              Go!
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

export default SearchForm;
