import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionRadioAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-radio slot="start"><ion-radio>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when item-left is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-radio item-left></ion-radio>\`
                     ~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The item-left attribute of ion-radio has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when item-right is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-radio item-right></ion-radio>\`
                     ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The item-right attribute of ion-radio has been renamed. Use slot="end" instead.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace item-left with slot="start"', () => {
      let source = `
        @Component({
          template: \`<ion-radio item-left></ion-radio>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The item-left attribute of ion-radio has been renamed. Use slot="start" instead.',
        startPosition: {
          line: 2,
          character: 32
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
          template: \`<ion-radio slot="start"></ion-radio>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace item-right with slot="end"', () => {
      let source = `
        @Component({
          template: \`<ion-radio item-right></ion-radio>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The item-right attribute of ion-radio has been renamed. Use slot="end" instead.',
        startPosition: {
          line: 2,
          character: 32
        },
        endPosition: {
          line: 2,
          character: 42
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-radio slot="end"></ion-radio>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
