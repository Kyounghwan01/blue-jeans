import React from "react";

type MyProps = {
  back: () => Promise<boolean> | undefined;
  next: () => Promise<boolean>;
  movePage: (pathName: string) => Promise<boolean>;
  name: string;
  hint?: { desc: string }[];
};

type MyState = {
  Component: any;
  pageName: string;
};

export default class DynamicComponent extends React.Component<
  MyProps,
  MyState
> {
  constructor(props: MyProps | Readonly<MyProps>) {
    super(props);
    this.state = {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      Component: require(`domains/${this.props.name}`).default,
      pageName: this.props.name
    };
  }

  componentDidUpdate() {
    if (this.state.pageName === this.props.name) return;

    this.setComponent(this.props.name);
  }

  public setComponent = (pageName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const comp = require(`domains/${pageName}`).default;
    this.setState({ Component: comp, pageName });
  };

  public render() {
    return (
      <>
        {this.state.Component && (
          <this.state.Component
            back={this.props.back}
            next={this.props.next}
            hint={this.props.hint}
          />
        )}
      </>
    );
  }
}
