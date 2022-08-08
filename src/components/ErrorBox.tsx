import { Box } from '@chakra-ui/react';
import React from 'react';

export default function ErrorBox({ errorMsg }: { errorMsg: string[] }) {
    if (errorMsg.length === 0) {
        return null;
    }

    return (
        <Box
            bgColor="#ffa87c"
            display={'grid'}
            placeItems="center"
            py={4}
            px={8}
            borderRadius={8}
            fontWeight="bold"
        >
            {errorMsg.map((message, i) => (
                <p key={i}> - {message}</p>
            ))}
        </Box>
    );
}
