import { useState, useRef } from "react";
import { Container, Text, VStack, Button, Box, Flex } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [splits, setSplits] = useState([]);
  const timerRef = useRef(null);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 6000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 6000) / 100)).padStart(2, "0");
    const hundredths = String(time % 100).padStart(2, "0");
    return `${minutes}:${seconds}.${hundredths}`;
  };

  const startStop = () => {
    if (running) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
    setRunning(!running);
  };

  const splitReset = () => {
    if (running) {
      setSplits([...splits, time]);
    } else {
      setTime(0);
      setSplits([]);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box bg="gray.800" color="yellow.400" p={6} borderRadius="md" boxShadow="lg">
        <Text fontSize="4xl" fontFamily="monospace" textAlign="center">
          {formatTime(time)}
        </Text>
      </Box>
      <Flex mt={4}>
        <Button colorScheme="yellow" onClick={startStop} mr={2}>
          {running ? "Stop" : "Start"}
        </Button>
        <Button colorScheme="yellow" onClick={splitReset}>
          {running ? "Split" : "Reset"}
        </Button>
      </Flex>
      <VStack mt={4} spacing={2} align="stretch" width="100%">
        {splits.map((split, index) => (
          <Box key={index} bg="gray.700" color="yellow.400" p={2} borderRadius="md">
            <Text fontSize="lg" fontFamily="monospace">
              Split {index + 1}: {formatTime(split)}
            </Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;