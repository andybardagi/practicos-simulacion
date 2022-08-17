import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {
    strToDownload: string;
    fileName: string;
    children: React.ReactNode;
};

export default function StringDownloader({ strToDownload, fileName, children }: Props) {
    const downloadTxtFile = () => {
        const element = document.createElement('a');
        const file = new Blob([strToDownload], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = fileName.endsWith('txt') ? fileName : `${fileName}.txt`;
        document.body.appendChild(element);
        element.click();
    };
    return <Button colorScheme={'linkedin'} onClick={downloadTxtFile}>{children}</Button>;
}
