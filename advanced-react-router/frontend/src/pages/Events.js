import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    // here you can access anything that was returned from the loader function
    const { events } = useLoaderData();

    // if (data.isError) {
    //     return <p>{data.message}</p>
    // }

    // the await component will execute once the resolve is fulfilled
    // but while we're waiting, suspense component will show a loading step
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>);
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');
    // automatically fetch returns a Response() object which is an object/method
    // supported by the browser to create a response that can be returned with any data
    // and headers that contain many options
    // however, the method fetch itself returns this response, so we can just return that
    if (!response.ok) {
        // A
        // return { isError: true, message: "Couldn't fetch data!" }
        // B
        // whenever an error is thrown, React router will display the closest errorElement!
        // throw { message: "Couldn't fetch data" };
        // C
        // throw new Response(JSON.stringify({ message: 'Could not fetch events' }), { status: 500 });
        // D
        throw json({ message: 'Could not find page' }, { status: 500 })
    } else {
        // "return response;" worked before before deferring any data,
        // now we have to parse the data ourselves and send back the events data
        // return response;
        const res = await response.json();
        return res.events;
    }
}

// loader is an arbitrary name
// this still runs in the browser, though you can do pretty much anything you can do in a nodejs code
// only limitation is you can't use React Hooks for example!
// also, removed the async keyword because we don't wanna wait for the events to load in order to 
// show the other components like the navbar
export function loader() {
    // this is to tell the router, to separate both elements
    // bundle all the http requests going on this page and give them a key, like events and execute it by adding ()
    return defer({
        events: loadEvents()
    })
}
