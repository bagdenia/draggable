const { DOM, PropTypes } = React;
const { bind } = _;

const Draggable = React.createClass({
  getInitialState() {
    return {
      relX: 0,
      relY: 0
    };
  },
  onMouseDown(e) {
    if (e.button !== 0) return;
    const ref = ReactDOM.findDOMNode(this.refs.handle);
    const body = document.body;
    const box = ref.getBoundingClientRect();
    this.setState({
      relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
      relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
    });
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.preventDefault();
  },
  onMouseUp(e) {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    e.preventDefault();
  },
  onMouseMove(e) {
    this.props.onMove({
      x: e.pageX - this.state.relX,
      y: e.pageY - this.state.relY
    });
    e.preventDefault();
  },
  render() {
    return <div
      onMouseDown={this.onMouseDown}
      style={{
        position: 'absolute',
        left: this.props.x,
        top: this.props.y
      }}
      ref="handle"
    >{this.props.children}</div>;
  }
})

const Test = React.createClass({
  getInitialState() {
    return {x: 100, y: 200};
  },
  render() {
    const {x, y} = this.state;
    return <Draggable x={x} y={y} onMove={this.move}>
        <img src = 'https://pp.userapi.com/c5641/u5790356/134714790/x_d1448a03.jpg' width = '200' />
    </Draggable>;
  },
  move(e) {
    this.setState(e);
  }
});

ReactDOM.render(<Test />, document.getElementById('app'));
