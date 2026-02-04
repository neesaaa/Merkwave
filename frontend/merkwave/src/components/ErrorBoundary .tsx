"use client";

import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
  errorInfo?: string; // <-- string is correct
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: "" };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const componentStack = errorInfo?.componentStack || "No component stack available";
    
    this.setState({ hasError: true, error, errorInfo: componentStack });

    // Full alert
    alert(
      `Client-side error:\n\nMessage: ${error.message}\n\nStack: ${error.stack}\n\nComponentStack:\n${componentStack}`
    );

    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-900 text-white">
          <h2>Something went wrong on the client!</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error?.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
