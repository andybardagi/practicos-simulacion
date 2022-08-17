import {
  Box, Button,
  Divider, Flex, Input, InputGroup,
  InputLeftAddon, Table, Tbody,
  Td, Th, Thead, Tooltip, Tr
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { ChiTester } from '../../simulation/tp1/handlers/ChiTester';
import { UniformIntervalHandler } from '../../simulation/tp1/handlers/UniformIntervalHandler';
import ErrorBox from '../ErrorBox';
import FrequencyComparator from '../FrequencyComparator';
import InfoBox from '../InfoBox';
import FormulaDisplay from './FormulaDisplay';
import { LanguageGeneratorSchema } from './LanguageGenerator.schema';

type CustomTypeGen = { number: number; intervals: number[]; line: number };

export default function LanguageGenerator() {
    // Form handling functions
    const [formValues, setFormValues] = useState({ max: '10000' });
    const [error, setError] = useState({ error: false, message: [] as string[] });

    const intervalHandler = useRef({} as UniformIntervalHandler);
    const chiTester = useRef({} as ChiTester);

    const [generations, setGenerations] = useState([] as CustomTypeGen[]);
    const [graphUpdate, setGraphUpdate] = useState(0);
    const [chiTest, setChiTest] = useState(
        {} as { c: number; chiValue: number; isAccepted: boolean },
    );

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
        intervalHandler.current = {} as UniformIntervalHandler;
        chiTester.current = {} as ChiTester;
        setGenerations([]);
        setError({ error: false, message: [] as string[] });
    };

    const simulate = (rounds: number, hideResult = false) => {
        try {
            //Check if CombinedCongruentGenerator and UniformIntervalHandler already exists. If not, create them.
            if (rounds < 0) {
                console.error('Se ingresó una cantidad negativa de simulaciones');
                return;
            }

            intervalHandler.current =
                intervalHandler.current instanceof UniformIntervalHandler
                    ? intervalHandler.current
                    : new UniformIntervalHandler(10);
            chiTester.current =
                chiTester.current instanceof ChiTester
                    ? chiTester.current
                    : new ChiTester(intervalHandler.current.getIntervals());

            //Simulate the generator
            const thisGenerations: CustomTypeGen[] = [];
            let line: number =
                generations.length === 0 ? 1 : generations[generations.length - 1].line + 1;
            for (let i = 0; i < rounds; i++) {
                let n: number = Math.random();
                intervalHandler.current.addNumber(n);
                thisGenerations.push({
                    number: n,
                    intervals: intervalHandler.current.getPercentagesState(),
                    line: line,
                });
                line++;
            }
            if (!hideResult) {
                setGenerations((prevValue) => [...prevValue, ...thisGenerations]);
            } else {
                setGenerations((prevValue) => [
                    ...prevValue,
                    ...thisGenerations.slice(Math.max(thisGenerations.length - 5, 0)),
                ]);
            }
            setGraphUpdate(graphUpdate + 1);
            chiTester.current.setIntervals(intervalHandler.current.getIntervals());
            setChiTest({
                c: chiTester.current.calculateC(),
                ...chiTester.current.makeTest(),
            });
        } catch (error: any) {
            console.log(error);
            setError({
                error: true,
                message: [
                    error.message ? error.message : 'Error en la simulación, revisar consola',
                ],
            });
        }
    };

    const handleGenerateClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setError({
            error: false,
            message: [],
        });
        LanguageGeneratorSchema.validate(formValues, { abortEarly: false })
            .then(() => {
                simulate(20);
            })
            .catch((err) => {
                setError({
                    error: true,
                    message: err.errors.map((error: { message: string }) => error.message),
                });
            });
    };

    const widthForms = ['45%', '45%', '45%', '21.25%'];

    return (
        <Box>
            {/* Input values form*/}

            <InputGroup width={widthForms} mb={2}>
                <InputLeftAddon>
                    <Tooltip label="Cantidad a generar">n</Tooltip>
                </InputLeftAddon>
                <Input
                    type="number"
                    onChange={handleValueChange}
                    name="max"
                    value={formValues.max}
                    placeholder="Ingrese la cantidad a generar"
                />
            </InputGroup>
            {/* Simulation generation buttons */}

            <Flex direction={'row'} justifyContent="end" py={2} gap={4}>
                {generations.length === 0 ? (
                    <Button colorScheme={'linkedin'} onClick={handleGenerateClick}>
                        Generar primeros 20 valores
                    </Button>
                ) : (
                    <>
                        <Button colorScheme={'linkedin'} onClick={() => simulate(20)}>
                            Generar 20 valores
                        </Button>
                        <Button colorScheme={'linkedin'} onClick={() => simulate(1)}>
                            Generar uno
                        </Button>
                        <Button
                            colorScheme={'linkedin'}
                            onClick={() =>
                                simulate(
                                    Number(formValues.max) -
                                        generations[generations.length - 1].line,
                                    true,
                                )
                            }
                        >
                            Completar {formValues.max}
                        </Button>
                    </>
                )}
            </Flex>

            <ErrorBox errorMsg={error.message} />

            {generations.length !== 0 ? (
                <Box>
                    <Flex direction={'row'} mt={4} justifyContent="end">
                        <a id="arriba" href="#resultado">
                            Ir al resultado
                        </a>
                    </Flex>
                    <Box w={'100%'} overflowX={'scroll'}>
                        {generations.length !== 0 ? (
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Número</Th>
                                        {intervalHandler.current
                                            .getLimitsStrings()
                                            .map((limit, index) => (
                                                <Th key={index}>{limit}</Th>
                                            ))}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {generations.map((gen, index) => (
                                        <Tr key={index}>
                                            <Td>{gen.line}</Td>
                                            <Td>{gen.number.toFixed(4)}</Td>
                                            {gen.intervals.map((i, index) => (
                                                <Td key={index}>{`${(i * 100).toFixed(2)}%`}</Td>
                                            ))}
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        ) : null}
                    </Box>
                    <Divider my={4} />
                    <FrequencyComparator
                        limits={intervalHandler.current.getLimitsStrings()}
                        intervals={generations[generations.length - 1].intervals}
                        total={generations[generations.length - 1].line}
                        key={graphUpdate}
                    />
                    <Flex direction={'row'} mt={4} mb={4} justifyContent="end">
                        <a id="resultado" href="#arriba">
                            Ir al inicio
                        </a>
                    </Flex>
                    {
                        <InfoBox
                            infoMsg={[
                                `Con un p-valor de 0,99`,
                                `${
                                    intervalHandler.current.getIntervals().length - 1
                                } grados de libertad`,
                                `c = ${chiTest.c.toFixed(4)}`,
                                `Valor Chi = ${chiTest.chiValue.toFixed(4)}`,
                                `Se ${chiTest.isAccepted ? 'acepta' : 'rechaza'} la hipótesis`,
                            ]}
                        />
                    }
                </Box>
            ) : (
                <InfoBox infoMsg={['Simulación pendiente']} />
            )}
        </Box>
    );
}
