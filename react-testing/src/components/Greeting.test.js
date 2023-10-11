import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";

// group multiple of tests in categories
describe('Greeting testsuite', () => {
    test('renders "hello world"', () => {
        // Arrange
        // this will render all the child components that are used within Greeting component like Output
        render(<Greeting />);
        // Act
        // nothing
        // Assert
        const element = screen.getByText(/hello world/i);
        expect(element).toBeInTheDocument();
    });

    test('renders "good to see you" if the button was not clicked', () => {
        // Arrange
        render(<Greeting />);
        // Act
        // nothing
        // Assert
        const element = screen.getByText('good to see you', { exact: false });
        expect(element).toBeInTheDocument();
    });

    test('renders "Changed!" if the button was clicked', () => {
        // Arrange
        render(<Greeting />);
        // Act
        const btnElement = screen.getByRole('button');
        userEvent.click(btnElement);
        // Assert
        const element = screen.getByText('Changed!');
        expect(element).toBeInTheDocument();
    });

    test('does not render "good to see you" when the button was clicked', () => {
        // Arrange
        render(<Greeting />);
        // Act
        const btnElement = screen.getByRole('button');
        userEvent.click(btnElement);
        // Assert
        // getByText would throw an error when the text is not on the document
        // so you'd rather use queryByText instead which will return null instead
        const element = screen.queryByText('good to see you', { exact: false });
        // expect(element).not.toBeInTheDocument();
        expect(element).toBeNull();
    });
});
