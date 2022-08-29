import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId: 'z4dpiac2',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: process.env.REACT_APP_TOKEN_BACKEND
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
    return builder.image(source)
}

export default client