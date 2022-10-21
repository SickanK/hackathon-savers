import {
    IconButton,
    Icon,
    Flex,
    VStack,
    Heading,
    Input,
    Button,
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import MemberInput from "./MemberInput";

export default function Members() {
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
                Medlemmar
            </Heading>

            <VStack gap={4}>
                <MemberInput value="072" />

                <Button
                    size="md"
                    colorScheme="brand"
                    rightIcon={<Icon as={RiAddLine} />}
                >
                    Nytt nummer
                </Button>
            </VStack>
        </Flex>
    );
}
