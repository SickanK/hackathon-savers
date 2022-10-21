import NextLink from "next/link";
import Link from "next/link";
import {
    Button,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    HStack,
    VStack,
    Text,
} from "@chakra-ui/react";
import PhoneInput from "../components/PhoneInput";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
    return (
        <Flex
            gap={8}
            direction="column"
            justify="center"
            align="center"
            h="100vh"
            p={4}
        >
            <VStack>
                <Heading as="h1" size="xl">
                    Logga in
                </Heading>

                <HStack>
                    <Text>Har du inte ett konto?</Text>

                    <NextLink href="/signup" passHref>
                        <Link>Skapa konto</Link>
                    </NextLink>
                </HStack>
            </VStack>

            <VStack gap={2}>
                <FormControl>
                    <FormLabel htmlFor="phone">Telefonnummer</FormLabel>
                    <PhoneInput
                        field={false}
                        id="phone"
                        name="phone"
                        variant="outline"
                        required
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="password">Lösenord</FormLabel>
                    <PasswordInput
                        id="password"
                        name="password"
                        variant="outline"
                        required
                    />
                </FormControl>

                <Button w="100%" colorScheme="brand">
                    Logga in
                </Button>
            </VStack>
        </Flex>
    );
}
