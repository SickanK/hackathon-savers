import Device from "./Device";
import { Flex, Heading, VStack } from "@chakra-ui/react";

export default function DeviceList() {
    return (
        <Flex
            direction="column"
            bg="white"
            p={6}
            gap={4}
            borderRadius="xl"
            w="100%"
        >
            <Heading as="h2" size="md">
                Enheter
            </Heading>

            <VStack gap={4}>
                <Device />
            </VStack>
        </Flex>
    );
}
