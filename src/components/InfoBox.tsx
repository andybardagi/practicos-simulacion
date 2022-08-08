import { Box } from '@chakra-ui/react';
import React from 'react';

export default function InfoBox({ infoMsg }: { infoMsg: string[] }) {
    if (infoMsg.length === 0) {
        return null;
    }

    return (
        <Box
            bgColor={'#12ADC133'}
            display={'grid'}
            placeItems="center"
            py={4}
            px={8}
            borderRadius={8}
            fontWeight="bold"
        >
            {infoMsg.map((message) => (
                <p>{message}</p>
            ))}
        </Box>
    );
}
