import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const colors = {
    brand: {
        300: "#08D69F",
        400: "#07BF8E",
        500: "#06A77D",
        600: "#069B73",
        700: "#058F6B",
    },
};

const theme = extendTheme({ colors });

const MyApp = ({ Component, pageProps }) => {
    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        setPageLoaded(true);
    }, []);
    return (
        <ChakraProvider theme={theme}>
            {pageLoaded ? <Component {...pageProps} /> : null}
        </ChakraProvider>
    );
};

export default MyApp;
