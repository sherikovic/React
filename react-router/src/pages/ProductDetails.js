import { Link, useParams } from "react-router-dom"

function ProductDetailsPage() {
    const params = useParams()

    return (
        <>
            <h1>Product Details of {params.id}</h1>
            <p><Link to=".." relative="path">Back</Link></p>
        </>
    )
}

export default ProductDetailsPage