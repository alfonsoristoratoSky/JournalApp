const About = () => {
  return (
    <ul>
      <li>
        The app does not store your password, authentication is achieved via
        Auth0
      </li>
      <li>
        Every function on the app is protected by access tokens with specific
        scopes, therefore, the token used to read your entries will not be the
        same used to create a new entry, allowing a more secure handling of data
      </li>
      <li>A non authenticated user will only be able to read the About page</li>
      <li>
        Every entry is stored with the email address used at registration and
        login, allowing you to read your own entries only
      </li>
    </ul>
  );
};
export default About;
