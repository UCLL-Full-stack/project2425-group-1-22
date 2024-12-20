import '@styles/global.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { appWithTranslation } from 'next-i18next';
import "./i18n"

const App = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default appWithTranslation(App);
