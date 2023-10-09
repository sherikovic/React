import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
    // What fetcher does is prevent the transition into the route that's registered with the newsletter
    // so you can submit it without the url changing to /newsletter
    const fetcher = useFetcher();
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data, state]);

    return (
        <fetcher.Form
            method="post"
            action='/newsletter' // you specify where this action should be loaded from (which route it comes from)
            className={classes.newsletter}
        >
            <input
                type="email"
                name='email'
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;
