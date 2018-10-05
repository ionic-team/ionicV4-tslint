import { expect } from 'chai';
import { ruleName } from '../src/ionItemIsNowAnElementRule';
import { assertAnnotated, assertSuccess, assertFailure } from './testHelper';
import { Utils, Replacement } from 'tslint';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-item></ion-item>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-item attribute is used on button', () => {
      let source = `
      @Component({
        template: \`
          <button ion-item></button>\`
                  ~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-item is now an ion-item element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-item attribute is used on anchor', () => {
      let source = `
      @Component({
        template: \`
          <a ion-item (click)="doSomething()"></a>\`
             ~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-item is now an ion-item element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-item attribute is used with multiline', () => {
      let source = `
      @Component({
        template: \`
          <a
            ion-item
            ~~~~~~~~
            (click)="doSomething()">Click Me</a>\`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'ion-item is now an ion-item element instead of an Angular directive.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace button with ion-item and remove attribute', () => {
      let source = `
        @Component({
          template: \`<button ion-item></button>
          \`
        })
        class Bar {}
      `;
      const fail = {
        message: 'ion-item is now an ion-item element instead of an Angular directive.',
        startPosition: {
          line: 2,
          character: 29
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
          template: \`<ion-item></ion-item>
          \`
        })
        class Bar {}
      `;
      expect(res).to.eq(expected);
    });
  });
});
