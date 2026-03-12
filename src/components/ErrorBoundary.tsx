import React from "react";
import { ScrollView, Text, View } from "react-native";

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    // Keep logging for development.
    // eslint-disable-next-line no-console
    console.error("Unhandled render error:", error, errorInfo);
  }

  render() {
    const { error, errorInfo } = this.state;
    if (!error) {
      return this.props.children;
    }

    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
          App crashed on startup
        </Text>
        <ScrollView>
          <Text selectable style={{ fontSize: 12, marginBottom: 12 }}>
            {error.stack ?? error.message}
          </Text>
          {errorInfo?.componentStack ? (
            <Text selectable style={{ fontSize: 12 }}>
              {errorInfo.componentStack}
            </Text>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

