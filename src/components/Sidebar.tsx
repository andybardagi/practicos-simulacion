import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ name, navLink }: { name: string; navLink: string }) => {
    return (
        <Box
            p={3}
            _hover={{
                backgroundColor: '#12ADC1',
                color: '#fff',
                textDecoration: 'underline',
            }}
        >
            <Text fontWeight={'bold'}>{name}</Text>
        </Box>
    );
};

export default function Sidebar() {
    const tpList = [
        {
            name: 'Integrantes',
            navLink: '/',
        },
        {
            name: 'Trabajo Práctico 1',
            navLink: '/tp1',
        },
        {
            name: 'Trabajo Práctico 2',
            navLink: '/tp2',
        },
        {
            name: 'Trabajo Práctico 3',
            navLink: '/tp3',
        },
        {
            name: 'Trabajo Práctico 4',
            navLink: '/tp4',
        },
        {
            name: 'Trabajo Práctico 5',
            navLink: '/tp5',
        },
        {
            name: 'Trabajo Práctico 6',
            navLink: '/tp6',
        },
        {
            name: 'Trabajo Práctico 7',
            navLink: '/tp7',
        },
    ];

    return (
        <Box w={'200px'} bgColor="#12ADC133">
            <List>
                {tpList.map((tp, index) => {
                    return (
                        <Link to={tp.navLink} key={index}>
                            <ListItem key={index}>
                                <SidebarItem name={tp.name} navLink={tp.navLink} />
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </Box>
    );
}
