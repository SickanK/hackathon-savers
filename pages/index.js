import { VStack, Box } from "@chakra-ui/react";
import AppHeader from "../components/AppHeader";
import Members from "../components/Members";
import MaxConsumption from "../components/MaxConsumption";

export async function getServerSideProps(context) {
    return {
        props: { message: `Next.js is awesome` }, // will be passed to the page component as props
    };
}

export default function Dashboard({ message }) {
    return (
        <Box bg="gray.100" minH="100vh">
            <AppHeader index={0} />

            <VStack gap={4} p={4}>
                <MaxConsumption defaultValue={2} />
                <Members />
            </VStack>
        </Box>
    );
}
