import AppHeader from "../components/AppHeader";
import DeviceList from "../components/DeviceList";
import { VStack } from "@chakra-ui/react";

export default function Devices() {
    return (
        <VStack w="100%" bg="gray.100" minH="100vh">
            <AppHeader index={1} />

            <VStack gap={4} p={4} w="100%">
                <DeviceList />
            </VStack>
        </VStack>
    );
}
