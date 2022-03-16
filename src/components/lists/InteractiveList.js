import "../../css/Content.css";
import { Component } from "react";
import { ListGroup, Container, Row, Pagination } from "react-bootstrap";

class InteractiveList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "",
      activePage: 1,
    };

    this.onClick = this.onClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  onClick(event) {
    this.setState({
      activeItem: event.target.id,
    });

    this.props.onSelect(event.target.id);
  }

  async onPageChange(event) {
    await this.props.onPageChange(this.props.type, event.target.id);

    this.setState({
      activePage: event.target.id,
    });
  }

  getTitle() {
    const { title } = this.props;

    if (title) {
      return (
        <Row>
          <h3>Author key: {this.props.title}</h3>
        </Row>
      );
    }
  }

  render() {
    const { items, fields } = this.props;

    console.info(items);

    if (!items || items.length === 0) {
      return null;
    }

    const itemsObjects = items[fields.entries];
    let pages = [];
    let names = [];

    for (let index = 0; index < itemsObjects.length; index++) {
      pages.push(
        <Pagination.Item
          key={index + 1}
          id={index + 1}
          active={index + 1 === this.state.activePage}
          onClick={this.onPageChange}
        >
          {index + 1}
        </Pagination.Item>
      );

      const key = itemsObjects[index].key;
      const active = this.state.activeItem === key;

      names.push(
        <ListGroup.Item
          onClick={this.onClick}
          className="Item"
          active={active}
          id={key}
          key={key}
          as="li"
        >
          {itemsObjects[index][fields.name]}
        </ListGroup.Item>
      );
    }

    return (
      <Container>
        {this.getTitle()}
        <Row>
          <ListGroup as="ul">{names}</ListGroup>
        </Row>
        <Row>
          <Pagination size="lg">{pages}</Pagination>
        </Row>
        <br />
      </Container>
    );
  }
}

export default InteractiveList;
