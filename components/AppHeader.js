import NextLink from "next/link";
import { Tabs, TabList, Tab, Box, Link } from "@chakra-ui/react";
import { VStack, Heading } from "@chakra-ui/react";

const items = [
    {
        title: "Översikt",
        path: "",
    },
    {
        title: "Enheter",
        path: "devices",
    },
];

export default function AppHeader({ index }) {
    return (
        <VStack borderBottomRadius="xl" bg="white" w="100%">
            <Box p={6}>
                <Heading>Energi Saver</Heading>
            </Box>

            <Box as="nav" bg="white" p={4} w="100%" borderBottomRadius="xl">
                <Tabs
                    overflowX="scroll"
                    variant="soft-rounded"
                    w="100%"
                    index={index}
                >
                    <TabList w="100%">
                        {items.map((item) => {
                            return (
                                <Tab
                                    key={item.title}
                                    w="100%"
                                    _selected={{
                                        bg: "brand.500",
                                        color: "white",
                                    }}
                                    ml={2}
                                    bg="gray.100"
                                    color="black"
                                >
                                    <NextLink href={`/${item.path}`} passHref>
                                        <Link>{item.title}</Link>
                                    </NextLink>
                                </Tab>
                            );
                        })}
                    </TabList>
                </Tabs>
            </Box>
        </VStack>
    );
}
