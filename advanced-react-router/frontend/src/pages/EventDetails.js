import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";

import EventItem from '../components/EventItem';
import { Suspense } from "react";
import EventsList from "../components/EventsList";

function EventDetailsPage() {
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {loadedEvent => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    )
}

export default EventDetailsPage;

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw json({ message: 'Could not find page' }, { status: 500 })
    } else {
        const res = await response.json();
        return res.event;
    }
}

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

// remember you can't use useParams because it is a React Hook
export async function loader({ req, params }) {
    return defer({
        event: await loadEvent(params.id),
        events: loadEvents()
    })
    // const response = await fetch('http://localhost:8080/events/' + params.id);
    // if (!response.ok) {
    //     throw json({ message: "Couldn't fetch details for the selected event!" }, { status: 500 });
    // } else {
    //     return response;
    // }
}

export async function action({ request, params }) {
    const response = await fetch('http://localhost:8080/events/' + params.id, {
        method: request.method // this is set in the submit method in the delete handler
    });
    if (!response.ok) {
        throw json({ message: 'Could not delete event.' }, { status: 500 });
    }
    return redirect('/events');
}