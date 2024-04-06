import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Head from 'next/head';

export const metadata = {
    title: "Quasar",
    description: "A place to find and share writing prompts",
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </Head>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout