import { InputGroup, InputRightElement, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "formik";

export default function PasswordInput(props) {
    const [show, setShow] = useState(false);

    return (
        <InputGroup>
            <Field
                as={Input}
                {...props}
                pr="4.5rem"
                type={show ? "text" : "password"}
            />
            <InputRightElement width="4.5rem">
                <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShow((prev) => !prev)}
                >
                    {show ? "Dölj" : "Visa"}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
}
