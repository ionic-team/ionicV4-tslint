import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionSpinnerAttributeValuesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style for name="lines"', () => {
      let source = `
      @Component({
        template: \`<ion-spinner name="lines"></ion-spinner>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });

    it('should work with proper style for name="lines-small"', () => {
      let source = `
      @Component({
        template: \`<ion-spinner name="lines-small"></ion-spinner>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when name="ios" is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-spinner name="ios"></ion-spinner>\`
                       ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The name="ios" attribute/value of ion-spinner should be written as name="lines".',
        source
      });
    });

    it('should fail when name="ios-small" is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-spinner name="ios-small"></ion-spinner>\`
                       ~~~~~~~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The name="ios-small" attribute/value of ion-spinner should be written as name="lines-small".',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace name="ios" with name="lines"', () => {
      let source = `
        @Component({
          template: \`
            <ion-spinner name="ios"></ion-spinner>\`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The name="ios" attribute/value of ion-spinner should be written as name="lines".',
        startPosition: {
          line: 3,
          character: 25
        },
        endPosition: {
          line: 3,
          character: 35
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-spinner name="lines"></ion-spinner>\`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace name="ios-small" with name="lines-small"', () => {
      let source = `
        @Component({
          template: \`
            <ion-spinner name="ios-small"></ion-spinner>\`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The name="ios-small" attribute/value of ion-spinner should be written as name="lines-small".',
        startPosition: {
          line: 3,
          character: 25
        },
        endPosition: {
          line: 3,
          character: 41
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-spinner name="lines-small"></ion-spinner>\`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
