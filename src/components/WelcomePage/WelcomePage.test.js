import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import WelcomePage from "./WelcomePage";
import store from '../../context/indexReducer';
import userEvent from "@testing-library/user-event";

describe("welcome page component", () => {
  test("renders Welcome To your Mail Box field", () => {
    // Arrange
    render(
      <Provider store={store}>
        <WelcomePage/>
      </Provider>
    );
    // Assert
    const welcomeTextNode = screen.getByText("Welcome To your Mail Box", {exact:false});
    expect(welcomeTextNode).toBeInTheDocument();
  });

  test("renders Create Email text inside button", () => {
    // Arrange
    render(
      <Provider store={store}>
        <WelcomePage/>
      </Provider>
    );
    // Assert
    const createEmailTextNode = screen.getByText("Create Email", {exact: false});
    expect(createEmailTextNode).toBeInTheDocument();
  });

  test("renders In Box text inside button", () => {
    // Arrange
    render(
      <Provider store={store}>
        <WelcomePage/>
      </Provider>
    );
    // Assert
    const inboxTextNode = screen.getByText("In Box", {exact: false});
    expect(inboxTextNode).toBeInTheDocument();
  });

  test("renders Out Box text inside button", () => {
    // Arrange
    render(
      <Provider store={store}>
        <WelcomePage/>
      </Provider>
    );
    // Assert
    const outboxTextNode = screen.getByText("Out Box", {exact: false});
    expect(outboxTextNode).toBeInTheDocument();
  });
  

  test("renders this is inbox when inbox is clicked", () => {
    // Arrange
    render(
      <Provider store={store}>
        <WelcomePage/>
      </Provider>
    );

    const inboxBtn = screen.getByText('In Box');
    userEvent.click(inboxBtn);

    // Assert
    const inboxclicklabel = screen.getByText("this is inbox", {exact: false});
    expect(inboxclicklabel).toBeInTheDocument();
  });

  
});

