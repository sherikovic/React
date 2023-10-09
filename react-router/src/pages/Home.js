import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {

    // this is just another way to navigate between links instead of using a or Link
    // for example when a form is submitted or timer expires
    // you should however stick to the norm of using normal links
    const navigate = useNavigate();
    function navigateHandler() {
        navigate('products');
    }

    return (
        <>
            <h1>My Home Page</h1>
            <p>
                Go to <Link to="products">the list of products</Link>
            </p>
            <p>
                <button onClick={navigateHandler}>Navigate</button>
            </p>
        </>
    )
}

export default HomePage;
