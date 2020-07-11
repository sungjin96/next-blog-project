import {  Row, Col } from 'react-bootstrap';
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

import { getAllBlogs } from "lib/api";

export default function Home({blogs}) {
    return (
        <PageLayout>
            <AuthorIntro />
            <hr/>
            <Row className="mb-5">
                {/*<Col md="10">*/}
                {/*    /!* CardListItem STARTS *!/*/}
                {/*    <CardListItem />*/}
                {/*    /!* CardListItem ENDS *!/*/}
                {/*</Col>*/}
                {
                    blogs.map(blog =>
                        <Col md="4" key={blog.slug}>
                            <CardItem
                                author={blog.author}
                                title={blog.title}
                                subtitle={blog.subtitle}
                                date={blog.date}
                                image={blog.coverImage}
                                slug={blog.slug}
                                link={{
                                    href: '/blogs/[slug]',
                                    as: `/blogs/${blog.slug}`
                                }}
                            />
                        </Col>
                    )
                }

            </Row>
        </PageLayout>
    )
}

// This function is called during the build (build time)
// Provides props to your page
// It will create static page
// 빌드 될때 단 한번만 실행한다
// getStaticProps는 빌드할 때 한번 실행되고 새로고침을 아무리 해도 실행되지 않는다.
// 데이터가 주기적으로 안바뀌면
export async function getStaticProps() {
    const blogs = await getAllBlogs();
    return {
        props: {
            blogs,
        }
    }
}

// getServerSideProps은 새로고침을 할 때 마다 실행된다.
// 계속 데이터가 바뀌면 서버사이드
// export async function getServerSideProps() {
//     const randomNumber = Math.random();
//     const blogs = await getAllBlogs();
//     return {
//         props: {
//             blogs,
//             randomNumber
//         }
//     }
// }

// Static Page
// Faster, can be cached using CDN
// Created at build time
// when we making the request we are always receiving the same html document

// Dynamic Page
// Created at request time (we can fetch data on server)
// Little bit slower, the time depends on data you are fetching