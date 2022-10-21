import { useState } from "react";
import { HStack, Icon, IconButton, Input } from "@chakra-ui/react";
import { HiOutlineTrash } from "react-icons/hi";

export default function MemberInput({ value }) {
    const [input, setInput] = useState(value);
    return (
        <HStack gap={1}>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
            <IconButton icon={<Icon as={HiOutlineTrash} />} />
        </HStack>
    );
}
