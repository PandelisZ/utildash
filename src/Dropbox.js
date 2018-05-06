import * as React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  outline: none;
  padding: 0px 20px;
  color: #666;
  font-size: 13px;
  ::placeholder {
    color: #bbb;
  }
`;

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: white;
  flex: 1;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 6px 20px;
  background-color: white;
  margin-top: 0px;
`;

const Item = styled.li`
  padding: 4px 0px;
  color: #666;
  font-size: 13px;
  cursor: pointer;
`;


class Dropdown extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      value: ''
    }
  }

   onSelectItem (index) {
    this.setState({
      value: ''
    });

    this.props.onSelectItem(index);
  };

  onSearch({ target }) {
    this.setState({
      value: target.value
    });

    if (target.value.length > 2) {
      this.props.onSearch(target.value);
    }
  };

   render() {
    const { options } = this.props;
    const { value } = this.state;

    return (
      <Container>
        <Input onChange={this.onSearch} value={value} placeholder="Search for a venue"/>
        {
          value.length > 2 && (
            <List>
              {
                options.map((el, index) => (
                  <Item
                    key={index}
                    onClick={this.onSelectItem.bind(this, index)}
                  >
                    {el.name}
                  </Item>
                ))
              }
            </List>
          )
        }
      </Container>
    );
  }
}

export default Dropdown;
