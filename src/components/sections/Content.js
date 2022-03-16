import { Component } from "react";
import { Container, Row } from "react-bootstrap";
import SearchForm from "../forms/SearchForm";
import getAuthors from "../../actions/searchByAuthor";
import getWorksByAuthor from "../../actions/getWorksByAuthor";
import InteractiveList from "../lists/InteractiveList";
import getWorkDetails from "../../actions/getWorkDetails";
import WorkDetails from "../info/WorkDetails";

const authorsFields = {
  totalSize: "numFound",
  entries: "docs",
  name: "name",
};

const authorWorksFields = {
  totalSize: "size",
  entries: "entries",
  name: "title",
};

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      fields: [],
      callback: undefined,
      activeName: "",
      activeAuthorKey: "",
      workDetails: undefined,
      activeType: "",
    };

    this.onSearch = this.onSearch.bind(this);
    this.onAuthorSelect = this.onAuthorSelect.bind(this);
    this.onWorkSelect = this.onWorkSelect.bind(this);
    this.showContent = this.showContent.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  async onSearch(name, page) {
    const items = await getAuthors(name, page);

    if (items && items.numFound > 0) {
      this.setState({
        items: items,
        fields: authorsFields,
        callback: this.onAuthorSelect,
        workDetails: undefined,
        activeName: name,
        activeType: "authors",
      });
    }
  }

  async onAuthorSelect(key, page) {
    const items = await getWorksByAuthor(key, page);

    if (items && items.size > 0) {
      this.setState({
        items: items,
        fields: authorWorksFields,
        callback: this.onWorkSelect,
        workDetails: undefined,
        activeAuthorKey: key,
        activeType: "works",
      });
    }
  }

  async onWorkSelect(key) {
    const workDetails = await getWorkDetails(key);

    this.setState({
      workDetails: workDetails,
      activeType: "workDetails",
    });
  }

  async onPageChange(type, page) {
    if (type === "authors") {
      await this.onSearch(this.state.activeName, page);
    } else if (type === "works") {
      await this.onAuthorSelect(this.state.activeAuthorKey, page);
    }
  }

  showContent() {
    if (this.state.workDetails) {
      return <WorkDetails workObject={this.state.workDetails}></WorkDetails>;
    }

    return (
      <InteractiveList
        title={this.state.activeAuthorKey}
        type={this.state.activeType}
        items={this.state.items}
        onSelect={this.state.callback}
        fields={this.state.fields}
        onPageChange={this.onPageChange}
      ></InteractiveList>
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <SearchForm onSearch={this.onSearch} />
        </Row>
        <Row>{this.showContent()}</Row>
      </Container>
    );
  }
}

export default Content;
