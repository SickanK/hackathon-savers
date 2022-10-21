import {
    HStack,
    Icon,
    Text,
    Switch,
    IconButton,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    Spacer,
    Box,
} from "@chakra-ui/react";
import { RiEditBoxLine } from "react-icons/ri";
import { BsFillCheckSquareFill } from "react-icons/bs";
import React, { useState } from "react";

export default function Device() {
    const [checked, setChecked] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("Test");

    function toggleEdit() {
        if (edit == true) {
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    function editName() {}

    return (
        <HStack bg="white" w="100%">
            {edit ? (
                <Flex w="100%" align="center">
                    <Box>
                        <Editable
                            defaultValue={name}
                            onChange={(nextValue) => setName(nextValue)}
                        >
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </Box>
                    <Spacer />
                    <Box>
                        <IconButton
                            m="2"
                            rightIcon={<Icon as={BsFillCheckSquareFill} />}
                            onClick={(e) => toggleEdit(e)}
                        />
                    </Box>
                </Flex>
            ) : (
                <Flex align="center" w="100%">
                    <Text>{name}</Text>

                    <IconButton
                        m="2"
                        icon={<Icon as={RiEditBoxLine} />}
                        onClick={(e) => toggleEdit(e)}
                    />
                    <Spacer />
                    <Switch justify="flex-end" />
                </Flex>
            )}
        </HStack>
    );
}
