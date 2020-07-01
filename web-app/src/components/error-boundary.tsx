import React from "react";

export interface ErrorBoundaryProps {
	children: React.ReactNode;
}

export interface ErrorBoundaryState {
	hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	public constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// Display fallback UI
		this.setState({ hasError: true });
		// You can also log the error to an error reporting service
		console.log(error, errorInfo);
	}

	public render(): React.ReactNode {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}
		return this.props.children;
	}
}
