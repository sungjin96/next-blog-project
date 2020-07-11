import client from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const blogFields = `
    title,
    subtitle,
    'slug': slug.current,
    date,
    'author': author->{name, 'avatar': avatar.asset->url},
    coverImage,
`

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}

export async function getAllBlogs() {
    return await client.fetch(`*[_type == "blog"]{${blogFields}}`);
}

export async function getBlogBySlug(slug) {
    return await client.fetch(`*[_type == "blog" && slug.current == $slug] {
        ${blogFields}
        content[]{..., "asset": asset->}
    }`, {slug}).then(res => res?.[0]);
}