import React = require('react')

interface Props {
  name: string;
}
interface State {}

class MyComponent extends React.Component<Props, State>{
  render() {
    return <div>
      Goodbye {this.props.name}
    </div>
  }
}

export default MyComponent
