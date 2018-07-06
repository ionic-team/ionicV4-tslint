import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionItemAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-item slot="start"></ion-item>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when item-start is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-item item-start></ion-item>\`
                    ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The item-start attribute of ion-item has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when item-left is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-item item-left></ion-item>\`
                    ~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The item-left attribute of ion-item has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when item-right is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-item item-right></ion-item>\`
                    ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The item-right attribute of ion-item has been renamed. Use slot="end" instead.',
        source
      });
    });

    it('should fail when item-end is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-item item-end></ion-item>\`
                    ~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The item-end attribute of ion-item has been renamed. Use slot="end" instead.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace item-start with slot="start"', () => {
      let source = `
        @Component({
          template: \`<ion-item item-start></ion-item>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The item-start attribute of ion-item has been renamed. Use slot="start" instead.',
        startPosition: {
          line: 2,
          character: 31
        },
        endPosition: {
          line: 2,
          character: 41
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-item slot="start"></ion-item>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace item-left with slot="start"', () => {
      let source = `
        @Component({
          template: \`<ion-item item-left></ion-item>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The item-left attribute of ion-item has been renamed. Use slot="start" instead.',
        startPosition: {
          line: 2,
          character: 31
        },
        endPosition: {
          line: 2,
          character: 40
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-item slot="start"></ion-item>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace item-right with slot="end"', () => {
      let source = `
        @Component({
          template: \`<ion-item item-right></ion-item>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The item-right attribute of ion-item has been renamed. Use slot="end" instead.',
        startPosition: {
          line: 2,
          character: 31
        },
        endPosition: {
          line: 2,
          character: 41
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-item slot="end"></ion-item>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace item-end with slot="end"', () => {
      let source = `
        @Component({
          template: \`<ion-item item-end></ion-item>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The item-end attribute of ion-item has been renamed. Use slot="end" instead.',
        startPosition: {
          line: 2,
          character: 31
        },
        endPosition: {
          line: 2,
          character: 39
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-item slot="end"></ion-item>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
