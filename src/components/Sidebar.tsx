import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigationContext } from '../hooks/NavigationContext';

const SidebarItem = ({ name, navLink }: { name: string; navLink: string }) => {
    const location = useLocation();
    return (
        <Link to={navLink}>
            <ListItem>
                <Box
                    p={3}
                    backgroundColor={location.pathname === navLink ? '#0295A9' : '#ffffff00'}
                    color={location.pathname === navLink ? '#fff' : '#000'}
                    _hover={{
                        backgroundColor: '#12ADC1',
                        color: '#fff',
                        textDecoration: 'underline',
                    }}
                >
                    <Text fontWeight={'bold'}>{name}</Text>
                </Box>
            </ListItem>
        </Link>
    );
};

export default function Sidebar() {
    const navContext = useNavigationContext();

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
        <>
            {navContext.sidebarDisplay ? (
                <Box w={'200px'} bgColor="#12ADC133">
                    <List>
                        {tpList.map((tp, index) => {
                            return (
                                <SidebarItem name={tp.name} navLink={tp.navLink} key={tp.navLink} />
                            );
                        })}
                    </List>
                </Box>
            ) : (
                <></>
            )}
        </>
    );
}
