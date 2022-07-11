import React from 'react';
import { Text, Center } from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Center h="100%">
          <Text fontSize="1xl">
            Ooops, something went wrong. We are sorry. Please, try again later.
          </Text>
        </Center>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
