import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const About = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} className={"m-2 border-container"}>
          <ul>
            <li>
              The app does not store your password, authentication is achieved
              via Auth0.
            </li>
            <li>
              Every function on the app is protected by access tokens with
              specific scopes, therefore, the token used to read your entries
              will not be the same used to create a new entry, the latter will
              then not be able to Delete or Modify an entry and so forth,
              allowing a more secure handling of data.
            </li>
            <li>
              A non authenticated user will only be able to read the About page.
            </li>
            <li>
              Every entry is stored with the email address used at registration
              and login, allowing you to read your own entries only.
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default About;
