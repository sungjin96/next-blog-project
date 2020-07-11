import {useState} from "react";
import {Row, Button} from 'react-bootstrap';
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import FilteringMenu from "components/FilteringMenu";
import {getAllBlogs} from "lib/api";
import {useGetBlogsPages} from "actions/pagination";

export default function Home({blogs}) {
    const [filter, setFilter] = useState({
        view: {list: 0},
        date: {asc: 0}
    });

    // loadMore: to load more data
    // isLoadingMOre: is true whenever we are making request to fetch data
    // is ReachingEnd: is true when we loaded all of the data, data is empty ( empty array )
    const {
        pages,
        isLoadingMore,
        isReachingEnd,
        loadMore
    } = useGetBlogsPages({blogs, filter});

    return (
        <PageLayout>
            <AuthorIntro/>
            <FilteringMenu
                filter={filter}
                onChange={(option, value) => {
                    setFilter({
                        ...filter,
                        [option]: value
                    })
                }}
            />
            <hr/>
            <Row className="mb-5">
                {pages}
            </Row>
            <div style={{textAlign: 'center'}}>
                <Button
                    onClick={loadMore}
                    disabled={isReachingEnd || isLoadingMore}
                    size="lg"
                    variant="outline-secondary"
                >
                    {isLoadingMore ? '...' : isReachingEnd ? 'No more blogs' : 'More Blogs'}
                </Button>
            </div>
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
    const blogs = await getAllBlogs({offset: 0, date: 'desc'});
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