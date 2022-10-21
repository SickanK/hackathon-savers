import { useState } from "react";
import {
    Button,
    Flex,
    Heading,
    VStack,
    Input,
    Text,
    InputRightAddon,
    InputGroup,
} from "@chakra-ui/react";

export default function MaxConsumption({ defaultValue }) {
    const [value, setValue] = useState(defaultValue);

    const onClick = async () => {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_GATEWAY_URL}/company`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({}),
            }
        );
    };

    return (
        <Flex direction="column" bg="white" p={6} gap={4} borderRadius="xl">
            <Heading as="h2" size="md">
                Maxvärde
            </Heading>

            <Flex direction="column" gap={2}>
                <Text>Max (kWh)</Text>
                <InputGroup>
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <InputRightAddon>
                        <Text>kWh</Text>
                    </InputRightAddon>
                </InputGroup>

                <Button onClick={onClick} size="md" colorScheme="brand">
                    Spara
                </Button>
            </Flex>
        </Flex>
    );
}
