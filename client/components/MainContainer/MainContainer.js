import Head from "next/head";
import Container from '@mui/material/Container';

const MainContainer = ({children, keyword}) => {

    return (
        <>
            <Head>
                <meta keywords={`Music ${keyword}`}/>
                <title>{keyword}</title>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            {children}
        </>
    )
}

export default MainContainer;