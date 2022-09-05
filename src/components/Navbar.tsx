import { Box, Flex, Text } from '@chakra-ui/react';
import { useNavigationContextUpdate } from '../hooks/NavigationContext';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Navbar() {
    const toggleNavbarDisplay = useNavigationContextUpdate();

    return (
        <Box w={'100%'} bgColor="#0295A9" paddingY={2} paddingX={4}>
            <Flex direction={'row'} justifyContent="space-between">
                <Flex direction={'row'} alignItems="center" gap={2}>
                    <HamburgerIcon onClick={() => toggleNavbarDisplay()} color="#fff" />
                    <Text fontSize={22} color="#fff" fontWeight={'bold'}>
                        Simulación - TPs
                    </Text>
                </Flex>
                <Flex
                    direction={'row'}
                    gap={4}
                    justifyContent="space-between"
                    alignItems="center"
                    color={'#fff'}
                ></Flex>
            </Flex>
        </Box>
    );
}
