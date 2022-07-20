import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SingleMail from './SingleMail';
import store from '../../../context/indexReducer';

describe("Single Mail component", () => {
  test("renders close button", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json: async () => {{}},
    })
    const singleMail={email: {body: '',from:'', heading:''},
        ID: 'iii'}
    // Arrange
    render(
      <Provider store={store}>
        <SingleMail data={singleMail}/>
      </Provider>
    );

    // Assert
    const closeTextNode = screen.getByText('close', {exact:false});
    expect(closeTextNode).toBeInTheDocument();
  });

  test("renders delete button", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json: async () => {{}},
    })
    const singleMail={email: {body: '',from:'', heading:''},
        ID: 'iii'}
    // Arrange
    render(
      <Provider store={store}>
        <SingleMail data={singleMail}/>
      </Provider>
    );

    // Assert
    const closeTextNode = screen.getByText('delete this email', {exact:false});
    expect(closeTextNode).toBeInTheDocument();
  });


});

