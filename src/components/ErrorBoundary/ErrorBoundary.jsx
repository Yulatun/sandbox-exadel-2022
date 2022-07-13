import React from 'react';
import { Center, Text } from '@chakra-ui/react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Center h="100%">
          <Text as="kbd" mt="4" align="center">
            <Text fontSize="5xl">Ooops,something went wrong.</Text>
            <Text fontSize="3xl">We are sorry. Please, try again later.</Text>
          </Text>
        </Center>
      );
    }
    return this.props.children;
  }
}
