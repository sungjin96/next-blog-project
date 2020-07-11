import {useEffect} from "react";
import {useSWRPages} from "swr";
import {useGetBlogs} from "actions";
import {Col} from "react-bootstrap";
import CardListItem from "components/CardListItem";
import CardListItemBlank from "components/CardListItemBlank";
import CardItem from "components/CardItem";
import CardItemBlank from "components/CardItemBlank";
import moment from 'moment';

export const useGetBlogsPages = ({blogs, filter}) => {

    useEffect(() => {
        window.__pagination__init = true;
    }, [])

    return useSWRPages(
        'index-page',
        ({offset, withSWR}) => {
            let initialData = !offset && blogs;

            if (typeof window !== 'undefined' && window.__pagination__init) {
                initialData = null;
            }

            const {data: paginatedBlogs} = withSWR(useGetBlogs({offset, filter}, initialData));

            if (!paginatedBlogs) {

                return Array(3)
                    .fill(0)
                    .map((_, i) =>
                        filter.view.list ?
                            <Col md="12" key={`${i}-list`}>
                                <CardListItemBlank/>
                            </Col>
                            :
                            <Col md="4" key={i}>
                                <CardItemBlank/>
                            </Col>
                    )
            }

            return paginatedBlogs.map(blog =>
                filter.view.list ?
                    <Col md="12" key={`${blog.slug}-list`}>
                        <CardListItem
                            author={blog.author}
                            title={blog.title}
                            subtitle={blog.subtitle}
                            date={moment(blog.date).format('LLL')}
                            image={blog.coverImage}
                            slug={blog.slug}
                            link={{
                                href: '/blogs/[slug]',
                                as: `/blogs/${blog.slug}`
                            }}
                        />
                    </Col>
                    :
                    <Col md="4" key={blog.slug}>
                        <CardItem
                            author={blog.author}
                            title={blog.title}
                            subtitle={blog.subtitle}
                            date={moment(blog.date).format('LLL')}
                            image={blog.coverImage}
                            slug={blog.slug}
                            link={{
                                href: '/blogs/[slug]',
                                as: `/blogs/${blog.slug}`
                            }}
                        />
                    </Col>
            )
        },
        // here you will compute offset that will get passed into previous callback function with 'withSWR'
        // SWR: data you will get from 'withSWR' function
        // index: number of current page
        (SWR, index) => {
            if (SWR.data && SWR.data.length === 0) {
                return null;
            }
            return (index + 1) * 6;
        },
        [filter]
    )

}