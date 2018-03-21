import React from 'react';
import get from '../ajaxHelper';
import styles from './styles/MenuViewStyles.css';
import MenuSelector from './MenuSelector';

class MenuView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restName: this.props.name || 'voluptatem9999975',
      menuType: 'lunch',
      tag: 'none',
      menuData: [],
    };
    this.menuSelect = this.menuSelect.bind(this);
    this.fetch = this.fetch.bind(this);
    this.filterSelect = this.filterSelect.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  fetch() {
    const { restName, menuType, tag } = this.state;
    get(restName, menuType, tag, (result) => {
      this.setState({
        menuData: result,
      });
    });
  }

  menuSelect(e) {
    this.setState({
      menuType: e.target.value,
      tag: 'none',
    }, () => this.fetch());
  }
  filterSelect(e) {
    this.setState({
      tag: e.target.value,
    }, () => this.fetch());
  }

  render() {
    return (
      <div className={styles.menuViewBox}>
        <div className={styles.title}>
          <h2>Menu</h2>
        </div>
        <div className={styles.menuNav}>
          <button
            className={styles.lunchBtn}
            value="lunch"
            onClick={this.menuSelect}
          >Lunch
          </button>
          <button
            className={styles.dinnerBtn}
            value="dinner"
            onClick={this.menuSelect}
          >Dinner
          </button>
          <button
            className={styles.dessertBtn}
            value="dessert"
            onClick={this.menuSelect}
          >Dessert
          </button>
          <select className="filterBox" onChange={this.filterSelect} value={this.state.tag}>
            <option value="none">filter</option>
            <option value="gluten-free">gluten-free</option>
            <option value="vegan">vegan</option>
            <option value="vegetarian">vegetarian</option>
          </select>
        </div>
        <MenuSelector
          menu={this.state.menuData}
          type={this.state.menuType}
          tag={this.state.tag}
        />
      </div>);
  }
}

export default MenuView;
