import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe('Async Component', () => {
    test('renders posts if request succeeds', async () => {
        // Async sends a fetch request
        // if we have many tests, that means we will be sending a lot of requests
        // even worse when we write to a database or send post requests
        // so instead of sending the real fetch request, we will just mock it
        window.fetch = jest.fn();
        // replace the json data sent back from the server to the fetch method with your own json data
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ id: 'p1', title: 'First Post' }]
        });
        render(<Async />);

        // find functions return a promise
        // find(item, options, timeout)
        const listElements = await screen.findAllByRole('listitem');
        expect(listElements).not.toHaveLength(0);
    });
});
