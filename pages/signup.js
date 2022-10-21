import NextLink from "next/link";
import { Formik, Field } from "formik";
import {
    Link,
    Button,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    HStack,
    VStack,
    Text,
    useToast,
    Input,
} from "@chakra-ui/react";
import PhoneInput from "../components/PhoneInput";
import PasswordInput from "../components/PasswordInput";

export default function Login() {
    const initialValues = { email: "", phone: "", password: "" };
    const toast = useToast();

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
                    Skapa Konto
                </Heading>

                <HStack>
                    <Text>Har du redan ett konto?</Text>

                    <NextLink href="/login" passHref>
                        <Link>Logga in</Link>
                    </NextLink>
                </HStack>
            </VStack>

            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    try {
                        const response = await fetch(
                            `http://localhost:3030/user`,
                            {
                                method: "POST",
                                mode: "cors",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",
                                body: JSON.stringify({
                                    email: values.email,
                                    phone: values.phone,
                                    password: values.password,
                                }),
                            }
                        );

                        if (response.status !== 200) {
                            throw new Error();
                        }

                        toast({
                            title: "Du är inloggad",
                            position: "top",
                            isClosable: true,
                            status: "success",
                        });
                        router.push("/");
                    } catch (error) {
                        console.log(error);
                        toast({
                            title: "Något gick fel",
                            position: "top",
                            isClosable: true,
                            status: "error",
                        });
                    }
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <VStack gap={2}>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Field
                                    as={Input}
                                    type="email"
                                    id="email"
                                    name="email"
                                    variant="outline"
                                    required
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="phone">
                                    Telefonnummer
                                </FormLabel>
                                <PhoneInput
                                    id="phone"
                                    name="phone"
                                    variant="outline"
                                    required
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="password">
                                    Lösenord
                                </FormLabel>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    variant="outline"
                                    required
                                />
                            </FormControl>

                            <Button type="submit" w="100%" colorScheme="brand">
                                Skapa konto
                            </Button>
                        </VStack>
                    </form>
                )}
            </Formik>
        </Flex>
    );
}
