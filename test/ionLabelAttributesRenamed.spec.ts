import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionLabelAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-label position="floating"></ion-label>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when fixed is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-label fixed></ion-label>\`
                     ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The fixed attribute of ion-label has been renamed. Use position="fixed" instead.',
        source
      });
    });

    it('should fail when floating is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-label floating></ion-label>\`
                     ~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The floating attribute of ion-label has been renamed. Use position="floating" instead.',
        source
      });
    });

    it('should fail when stacked is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-label stacked></ion-label>\`
                     ~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The stacked attribute of ion-label has been renamed. Use position="stacked" instead.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace fixed with position="fixed"', () => {
      let source = `
        @Component({
          template: \`<ion-label fixed></ion-label>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The fixed attribute of ion-label has been renamed. Use position="fixed" instead.',
        startPosition: {
          line: 2,
          character: 32
        },
        endPosition: {
          line: 2,
          character: 37
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`<ion-label position="fixed"></ion-label>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace floating with position="floating"', () => {
      let source = `
        @Component({
          template: \`<ion-label floating></ion-label>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The floating attribute of ion-label has been renamed. Use position="floating" instead.',
        startPosition: {
          line: 2,
          character: 32
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
          template: \`<ion-label position="floating"></ion-label>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace stacked with position="stacked"', () => {
      let source = `
        @Component({
          template: \`<ion-label stacked></ion-label>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The stacked attribute of ion-label has been renamed. Use position="stacked" instead.',
        startPosition: {
          line: 2,
          character: 32
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
          template: \`<ion-label position="stacked"></ion-label>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
