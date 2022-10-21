import {
    Input,
    HStack,
    InputGroup,
    Select,
    InputLeftElement,
} from "@chakra-ui/react";
import { Field } from "formik";

export default function PhoneInput(props) {
    return (
        <HStack spacing={4}>
            <InputGroup>
                <InputLeftElement width="6rem">
                    <Select
                        variant="filled"
                        h="1.75rem"
                        w="5rem"
                        borderRadius="md"
                        size="sm"
                        defaultValue="SE"
                    >
                        <option value="NO">+47</option>
                        <option value="SE">+46</option>
                        <option value="CH">+41</option>
                    </Select>
                </InputLeftElement>
                {props.field ? (
                    <Field as="Input" {...props} pl="6rem" type="tel" />
                ) : (
                    <Input {...props} pl="6rem" type="tel" />
                )}
            </InputGroup>
        </HStack>
    );
}
