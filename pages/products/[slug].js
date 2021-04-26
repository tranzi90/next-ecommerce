import Head from "next/head"

import {API_URL, fromImageToUrl} from "../../utils/urls"
import {twoDecimals} from "../../utils/format"

const Product = ({ product }) => (
    <div>
        <Head>
            {product.meta_title &&
                <title>{product.meta_title}</title>
            }
            {product.meta_description &&
                <meta name='description' content={product.meta_description} />
            }
        </Head>
        <h3>{product.name}</h3>
        <img src={fromImageToUrl(product.image)} />
        <p>${ twoDecimals(product.price) }</p>

        <p>
            {product.content}
        </p>
    </div>
)

export default Product

export async function getStaticProps({ params: { slug }}) {
        const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
        const found = await product_res.json()

        return {
                props: {
                        product: found[0]
                }
        }
}

export async function getStaticPaths() {
        const product_res = await fetch(`${API_URL}/products/`)
        const products = await product_res.json()

        return {
                paths:  products.map(product => ({
                        params: { slug: String(product.slug) }
                })),
                fallback: false
        }
}