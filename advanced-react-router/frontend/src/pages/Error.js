import { useRouteError } from 'react-router-dom';

import PageContent from "../components/PageContent";
import MainNavigation from '../components/MainNavigation';

function ErrorPage() {
    // error would hold the exact data being thrown, weather it's my own object or the Response's
    const error = useRouteError();
    let title = 'An error occured';
    let message = 'Somthing went wrong :(';

    if (error.status === 500) {
        // message = JSON.parse(error.data).message; //only when using Response
        message = error.data.message;
    } else if (error.status === 404) {
        title = 'Not found';
        message = 'Could not find resource'
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage