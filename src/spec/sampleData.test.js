const { sampleData } = require('../../data/sampleData');
// test sample data array
describe('sample data array', () => {
  it('should be and array', () => {
    expect(Array.isArray(sampleData)).toBe(true);
  });

  it('should have a length of 119 items', () => {
    expect(sampleData.length).toEqual(120);
  });
  // test individual object from sample data array
  describe('sample data item', () => {
    const item = sampleData[0];
    let itemKeys = Object.keys(item);
    let expected = ['id', 'name', 'menu'];

    it('should be an object with the correct keys', () => {
      expect(itemKeys.length).toEqual(3);
      expect(itemKeys).toEqual(expect.arrayContaining(expected));
      expect(['id', 'name', 'dog']).not.toEqual(expect.arrayContaining(expected));
    });

    it('should contain the correct value types at each property', () => {
      expect(typeof item.id).toBe('number');
      expect(typeof item.name).toBe('string');
      expect(typeof item.menu).toBe('object');
      expect(Array.isArray(item.menu)).toBe(false);
    });
    describe('the property "menu" and it\'s structure', () => {
      it('should contain the correct keys', () => {
        expected = ['lunch', 'dinner', 'dessert'];
        itemKeys = Object.keys(item.menu);
        expect(itemKeys).toEqual(expect.arrayContaining(expected));
      });

      it('should contain an array at each key with the correct structure', () => {
        const { menu: { lunch } } = item;
        const { menu: { dinner } } = item;
        const { menu: { dessert } } = item;

        expected = {
          foodItem: 'string',
          cost: 'number',
          tags: 'string',
        };

        expect(Array.isArray(lunch)).toBe(true);
        expect(Array.isArray(dinner)).toBe(true);
        expect(Array.isArray(dessert)).toBe(true);
      });
    });
  });
});